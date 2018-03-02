yum install git
git clone https://github.com/arut/nginx-rtmp-module.git
yum install wget
wget  http://nginx.org/download/nginx-1.8.1.tar.gz 
tar zxvf nginx-1.8.1.tar.gz
cd nginx-1.8.1
yum -y install gcc pcre-devel openssl openssl-devel
cd ..
wget http://h264.code-shop.com/download/nginx_mod_h264_streaming-2.2.7.tar.gz 
tar -zxvf nginx_mod_h264_streaming-2.2.7.tar.gz
解压后需要修改src目录下的ngx_http_streaming_module.c文件,将r->zero_in_uri所在的if语句注释掉
cd ../..
wget -O ngx_cache_purge.zip https://github.com/FRiCKLE/ngx_cache_purge/archive/master.zip
yum install unzip
unzip ngx_cache_purge.zip 
cd nginx-1.8.1
./configure --add-module=/root/nginx-rtmp-module --add-module=/root/ngx_cache_purge-master --add-module=/root/nginx_mod_h264_streaming-2.2.7 --with-http_stub_status_module --with-http_ssl_module --with-http_sub_module --with-http_gzip_static_module --with-http_flv_module
make
有一些C语言错误按照提示。自己解决。
解决错误后make
make install 
nginx安装完成，启动/usr/local/nginx
systemctl stop firewalld
wget https://download.videolan.org/pub/videolan/x264/snapshots/last_x264.tar.bz2
yum install bzip2
tar -xvf last_x264.tar.bz2
//安装yasm
yum update
wget http://www.tortall.net/projects/yasm/releases/yasm-1.3.0.tar.gz
tar -zxvf yasm-1.3.0.tar.gz
cd yasm-1.3.0
./configure
make
make install

wget http://www.nasm.us/pub/nasm/releasebuilds/2.13.02/nasm-2.13.02.tar.gz
tar -zxvf nasm-2.13.02.tar.gz
./configure
make & make install

cd x264-snapshot-20180103-2245/
./configure --enable-shared --enable-pic  
make  
make install  
wget http://http.debian.net/debian/pool/non-free/f/faac/faac_1.29.7.7.orig.tar.gz

git clone https://git.ffmpeg.org/ffmpeg.git ffmpeg

进入nginx的conf文件夹下的mime.types.default配置文件
编辑mime.types.default配置文件，添加如下配置
application/x-mpegURL  m3u8;


ffmpeg -re -i "/usr/local/nginx/html/hls/test4.mp4" -vcodec libx264 -vprofile baseline -acodec aac -ar 44100 -strict -2 -ac 1 -f avi -s 1280x720 -q 10 rtmp://127.0.0.1:1935/hls/film1

当你访问nginx页面的时候出现 Permission denied 不用担心，please use chmod o+x  /home 