#!/usr/bin/env bash
# 在腾讯云 Ubuntu 服务器上执行一次：安装 Nginx、建站点目录、启用配置
# 用法：
#   curl -fsSL ... | bash          # 或把本文件 scp 上去后：
#   sudo bash setup-ubuntu.sh

set -euo pipefail

SITE_ROOT="${SITE_ROOT:-/var/www/xiaobenjing}"
NGINX_SITE="${NGINX_SITE:-/etc/nginx/sites-available/xiaobenjing}"
REPO_NGINX_EXAMPLE="${REPO_NGINX_EXAMPLE:-}"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "请用 root 或 sudo 运行：sudo bash setup-ubuntu.sh"
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y nginx rsync curl

mkdir -p "$SITE_ROOT"
chown -R www-data:www-data "$SITE_ROOT"

# 占位页，避免空目录 403；正式部署后会被 dist 覆盖
if [[ ! -f "$SITE_ROOT/index.html" ]]; then
  cat > "$SITE_ROOT/index.html" <<'HTML'
<!doctype html>
<html lang="zh-CN">
<head><meta charset="utf-8"><title>小本经 · 部署中</title></head>
<body style="font-family:sans-serif;padding:2rem">
  <h1>小本经</h1>
  <p>Nginx 已就绪，等待上传 dist/。</p>
</body>
</html>
HTML
  chown www-data:www-data "$SITE_ROOT/index.html"
fi

if [[ -n "$REPO_NGINX_EXAMPLE" && -f "$REPO_NGINX_EXAMPLE" ]]; then
  cp "$REPO_NGINX_EXAMPLE" "$NGINX_SITE"
else
  # 内嵌与仓库 example 一致的最小配置（备案前用 IP）
  cat > "$NGINX_SITE" <<'NGINX'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    root /var/www/xiaobenjing;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location = /index.html {
        add_header Cache-Control "no-cache";
    }

    location /assets/ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
}
NGINX
fi

# Ubuntu：sites-enabled；部分镜像只有 conf.d
if [[ -d /etc/nginx/sites-enabled ]]; then
  rm -f /etc/nginx/sites-enabled/default
  ln -sfn "$NGINX_SITE" /etc/nginx/sites-enabled/xiaobenjing
elif [[ -d /etc/nginx/conf.d ]]; then
  ln -sfn "$NGINX_SITE" /etc/nginx/conf.d/xiaobenjing.conf
fi

nginx -t
systemctl enable nginx
systemctl restart nginx

PUBLIC_IP="$(curl -fsS --max-time 3 https://ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')"

echo ""
echo "✓ Nginx 已就绪"
echo "  站点目录: $SITE_ROOT"
echo "  配置文件: $NGINX_SITE"
echo "  浏览器访问: http://${PUBLIC_IP}/"
echo ""
echo "下一步（在你电脑上）："
echo "  1. 腾讯云安全组放行 TCP 80（备案后加 443）"
echo "  2. 本地执行: ./deploy/deploy.sh root@${PUBLIC_IP}"
echo "  3. 备案通过后改 server_name 为域名，再申请 SSL"
