#!/usr/bin/env bash
# 本机构建并 rsync 到腾讯云 Ubuntu
# 用法：
#   ./deploy/deploy.sh root@1.2.3.4
#   DEPLOY_HOST=root@1.2.3.4 ./deploy/deploy.sh
#   REMOTE_DIR=/var/www/xiaobenjing SKIP_BUILD=1 ./deploy/deploy.sh root@1.2.3.4

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

DEPLOY_HOST="${1:-${DEPLOY_HOST:-}}"
REMOTE_DIR="${REMOTE_DIR:-/var/www/xiaobenjing}"
SKIP_BUILD="${SKIP_BUILD:-0}"

if [[ -z "$DEPLOY_HOST" ]]; then
  echo "用法: ./deploy/deploy.sh user@公网IP"
  echo "示例: ./deploy/deploy.sh root@1.2.3.4"
  exit 1
fi

if [[ ! -f .env ]]; then
  echo "未找到 .env。备案前可用示例值："
  echo "  cp .env.example .env"
  echo "  将 VITE_SITE_URL 临时改成 http://你的公网IP"
  echo "  （备案通过后再改回 https://www.xiaobenjing.com 并重新 build 部署）"
  exit 1
fi

if ! command -v rsync >/dev/null 2>&1; then
  echo "需要 rsync：macOS 自带；Ubuntu 本机可 apt install rsync"
  exit 1
fi

if [[ "$SKIP_BUILD" != "1" ]]; then
  echo "→ npm ci && npm run build"
  npm ci
  npm run build
fi

if [[ ! -d dist ]] || [[ ! -f dist/index.html ]]; then
  echo "dist/ 不存在或缺少 index.html，请先 npm run build"
  exit 1
fi

echo "→ rsync dist/ → ${DEPLOY_HOST}:${REMOTE_DIR}/"
rsync -avz --delete \
  --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r \
  dist/ "${DEPLOY_HOST}:${REMOTE_DIR}/"

# 尽量纠正属主（失败可忽略）
ssh "$DEPLOY_HOST" "chown -R www-data:www-data '${REMOTE_DIR}' 2>/dev/null || true"

HOST_ONLY="${DEPLOY_HOST#*@}"
echo ""
echo "✓ 部署完成"
echo "  访问: http://${HOST_ONLY}/"
echo "  详情页抽查: http://${HOST_ONLY}/project/1"
