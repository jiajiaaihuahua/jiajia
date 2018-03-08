package com.innovaee.hts.web.junit;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

/**
 * Created by WangShiXiang on 2017/2/25.
 */
public class Zip {
    /**
     * 用来压缩单个文件
     * @param filepath 源文件路径
     * @param zippath 压缩完成后存放的路径
     */
    public static void addZipFile(String filepath,String zippath){
        File file=new File(filepath);
        File zipFile=new File(zippath);
        try {
            FileInputStream in=new FileInputStream(file);
            ZipOutputStream zipOut=new ZipOutputStream(new FileOutputStream(zipFile));
            zipOut.putNextEntry(new ZipEntry(file.getName()));
            byte[] buf=new byte[8*1024];
            int b;
            while((b=in.read(buf,0,buf.length))!=-1){
                zipOut.write(buf, 0, b);
            }
            in.close();
            zipOut.close();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }
    /**
     * 用来压缩一个文件夹里的所有内容，就是常规的文件压缩
     * @param filepath 文件或者文件夹的路径
     * @param zippath 生成ZIP文件的路径
     * @param dirFlg 是否包含当前的文件夹
     */
    public static void zipMuitFile(String filepath,String zippath,boolean dirFlg){

        try {
            File file=new File(filepath);
            File zipFile=new File(zippath);
            ZipOutputStream zipOut=new ZipOutputStream(new FileOutputStream(zipFile));
            if(file.isDirectory()){
                File[] files=file.listFiles();
                for(File fileSec:files){
                    if(dirFlg){
                        recursionZip(zipOut,fileSec,file.getName()+File.separator);
                    }else{
                        recursionZip(zipOut,fileSec,file.getName()+"");
                    }
                }
            }
            zipOut.close();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
    /**
     * 用来对文件的递归操作压缩
     * @param zipOut ZipOutputStream的输出流
     * @param file 文件或者文件夹的路径
     * @param baseDir 该文件在哪个文件夹下
     * @throws IOException
     */
    private static void recursionZip(ZipOutputStream zipOut,File file,String baseDir) throws IOException{
        if(file.isDirectory()){
            File[] files=file.listFiles();
            for(File fileSec:files){
                recursionZip(zipOut,fileSec,baseDir+file.getName()+File.separator);
            }
        }else{
            byte[] buf=new byte[1024*8];
            InputStream input=new FileInputStream(file);
            zipOut.putNextEntry(new ZipEntry(baseDir+file.getName()));
            int b;
            while((b=input.read(buf))!=-1){
                zipOut.write(buf, 0, b);
            }
            input.close();
        }
    }
    /**
     * 用来解压一个压缩包
     * @param zipFilePath :ZIP文件的路径
     * @param unZipFilePath :ZIP文件的输出路径
     * @param dirFlg:ZIP文件的保存路径是否包含压缩包的名字
     */

    public static void unZip(String zipFilePath,String unZipFilePath,boolean dirFlg){

        File zipFile=new File(zipFilePath);
        if(dirFlg){
            String fileName=zipFile.getName();
            if(fileName!=null&&fileName!=""){
                fileName=fileName.substring(0, fileName.lastIndexOf("."));
            }
            unZipFilePath=unZipFilePath+File.separator+fileName;
        }
        File unZipFileDir=new File(unZipFilePath);

        if(!unZipFileDir.exists()||!unZipFileDir.isDirectory()){
            unZipFileDir.mkdirs();
        }
        try {
            ZipFile zipFile_Z=new ZipFile(zipFile);
            ZipInputStream zipInput=new ZipInputStream(new FileInputStream(zipFile));
            ZipEntry entry=null;
            String entryFilePath=null;
            String entryDirPath=null;
            InputStream input=null;
            OutputStream output=null;
            File entryDir=null;
            File entryFile=null;
            int index=0;
            int content=0;
            while((entry=zipInput.getNextEntry())!=null){
                //构建压缩包中一个文件解压后保存的全路径
                entryFilePath=unZipFilePath+File.separator+entry.getName();
                //解压后保存文件的文件夹路径
                if((index=entryFilePath.lastIndexOf(File.separator))!=-1){
                    entryDirPath=entryFilePath.substring(0, index);
                }else{
                    entryDirPath="";
                }
                entryDir=new File(entryDirPath);
                //如果文件夹路径不存在，创建文件夹

                if(!entryDir.exists()||!entryDir.isDirectory()){
                    entryDir.mkdirs();
                }
                entryFile=new File(entryFilePath);
                input=new BufferedInputStream(zipFile_Z.getInputStream(entry));
                output=new BufferedOutputStream(new FileOutputStream(entryFile));
                byte[] buf=new byte[1024*8];
                while((content=input.read(buf, 0, buf.length))!=-1){
                    output.write(buf, 0, content);
                }
                output.flush();
                output.close();
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }
}
