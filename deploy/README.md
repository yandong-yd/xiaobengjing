# 腾讯云 Ubuntu 部署（小本经）

本站是 **静态 SPA**（`npm run build` → `dist/`）。备案未完成前用 **公网 IP + HTTP**；备案通过后再绑域名和 HTTPS。

## 0. 腾讯云控制台

1. 轻量应用服务器 / CVM，系统选 **Ubuntu 22.04**
2. **防火墙 / 安全组** 放行：`22`（SSH）、`80`（HTTP）；备案后再放行 `443`
3. 记下公网 IP，例如 `1.2.3.4`

## 1. 服务器初始化（SSH 上去执行一次）

把仓库里的脚本拷上去，或直接粘贴运行：

```bash
# 本机
scp deploy/setup-ubuntu.sh root@1.2.3.4:~/
scp deploy/nginx-xiaobenjing.conf.example root@1.2.3.4:~/

# 服务器
ssh root@1.2.3.4
sudo bash setup-ubuntu.sh
# 若要用仓库里的 nginx 示例：
# sudo REPO_NGINX_EXAMPLE=$HOME/nginx-xiaobenjing.conf.example bash setup-ubuntu.sh
```

浏览器打开 `http://1.2.3.4/`，应看到「部署中」占位页。

## 2. 本机准备环境变量再构建上传

```bash
cp .env.example .env
```

备案前建议临时改：

```env
VITE_SITE_URL=http://1.2.3.4
```

（百度统计、OpenAI 等按需填写。国内调用 OpenAI 请配 `VITE_OPENAI_BASE_URL` 中转。）

然后部署：

```bash
chmod +x deploy/deploy.sh deploy/setup-ubuntu.sh
./deploy/deploy.sh root@1.2.3.4
```

抽查：

- `http://1.2.3.4/`
- `http://1.2.3.4/project/1`（刷新不应 404）

## 3. 备案通过后切域名

1. 域名解析：`A` 记录 `@` / `www` → 服务器 IP（在腾讯云 DNS）
2. 改 Nginx `server_name`：

```nginx
server_name xiaobenjing.com www.xiaobenjing.com;
```

```bash
sudo nano /etc/nginx/sites-available/xiaobenjing
sudo nginx -t && sudo systemctl reload nginx
```

3. HTTPS（二选一）
   - 腾讯云 SSL 控制台申请免费证书，按说明配到 Nginx
   - 或：`sudo apt install -y certbot python3-certbot-nginx && sudo certbot --nginx -d xiaobenjing.com -d www.xiaobenjing.com`

4. 改回生产地址并重新部署：

```env
VITE_SITE_URL=https://www.xiaobenjing.com
```

```bash
./deploy/deploy.sh root@1.2.3.4
```

5. 确认新站正常后，再把 DNS 从 Vercel 彻底切到腾讯云（或删掉 Vercel 项目）

## 常用命令

| 操作 | 命令 |
|------|------|
| 只上传不重新构建 | `SKIP_BUILD=1 ./deploy/deploy.sh root@IP` |
| 看 Nginx 错误日志 | `sudo tail -f /var/log/nginx/error.log` |
| 重载配置 | `sudo nginx -t && sudo systemctl reload nginx` |

## 说明

- 不需要在服务器上跑 Node / `npm run dev`
- Supabase、OpenAI 由浏览器直连；不配也能用内置 mock / AI 演示模式
- `@vercel/analytics` 在自建环境可忽略，百度统计继续生效
