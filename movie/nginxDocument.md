nginx手册
1：下载virtualBox,centos7 
如果无法连接网络
cd /etc/sysconfig/network-scripts
ls -a
vi ifcfg-ens33 编辑这个文件，onboot修改为yes
service network restart
参考 ：http://www.glbwl.com/centos-7-repo-base.html


notice：1)virtualBox 无法创建64位系统，解决办法是进入系统bios修改虚拟化选项为true。
        2)系统安装完成后，宿主主机无法访问虚拟机内部应用程序，问题是防火墙的限制。解决办法，关闭linux防火墙 或者 开启80端口
firewall-cmd --zone=public --add-port=80/tcp --permanent ，出现success表明添加成功
命令含义：
--zone #作用域
--add-port=80/tcp  #添加端口，格式为：端口/通讯协议
--permanent   #永久生效，没有此参数重启后失效

重启防火墙
systemctl restart firewalld.service
1、运行、停止、禁用firewalld
启动：# systemctl start  firewalld
查看状态：# systemctl status firewalld 或者 firewall-cmd --state
停止：# systemctl disable firewalld
禁用：# systemctl stop firewalld
参考来源：https://www.bbsmax.com/A/MAzAWYLy59/

安装ffmpeg
yum install wget



wget http://www.tortall.net/projects/yasm/releases/yasm-1.3.0.tar.gz
tar -zxvf yasm-1.3.0.tar.gz
cd yasm-1.3.0
./configure
make && make install

tar -zxvf ffmpeg-3.1.tar.gz
进入解压目录编辑安装
./configure
make
make install

