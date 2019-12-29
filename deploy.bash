echo supergeil
cd micro-servers/dp-image-download-server
git pull
npm i
npm run build
pm2 restart dp-image-download-server
