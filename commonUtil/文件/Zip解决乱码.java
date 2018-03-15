package com.innovaee.hts.web.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.tools.zip.ZipOutputStream;

public class Zip {
 
  public static void zip(ZipOutputStream out, File f, String base, boolean first)
      throws Exception {
    if (first) {
      if (f.isDirectory()) {
        out.putNextEntry(new org.apache.tools.zip.ZipEntry("/"));
        base = base + f.getName();
        first = false;
      } else
        base = f.getName();
    }
    if (f.isDirectory()) {
      File[] fl = f.listFiles();
      base = base + "/";
      for (int i = 0; i < fl.length; i++) {
        zip(out, fl[i], base + fl[i].getName(), first);
      }
    } else {
      out.putNextEntry(new org.apache.tools.zip.ZipEntry(base));
      FileInputStream in = new FileInputStream(f);
      int b;
      System.out.println(base);
      while ((b = in.read()) != -1) {
        out.write(b);
      }
      in.close();
    }
  }

 
  @SuppressWarnings("unchecked")
  public static void unZipFileByOpache(org.apache.tools.zip.ZipFile zipFile,
      String unZipRoot) throws Exception, IOException {
    java.util.Enumeration e = zipFile.getEntries();
    System.out.println(zipFile.getEncoding());
    org.apache.tools.zip.ZipEntry zipEntry;
    while (e.hasMoreElements()) {
      zipEntry = (org.apache.tools.zip.ZipEntry) e.nextElement();
      InputStream fis = zipFile.getInputStream(zipEntry);
      if (zipEntry.isDirectory()) {
      } else {
        File file = new File(unZipRoot + File.separator + zipEntry.getName());
        File parentFile = file.getParentFile();
        parentFile.mkdirs();
        FileOutputStream fos = new FileOutputStream(file);
        byte[] b = new byte[1024];
        int len;
        while ((len = fis.read(b, 0, b.length)) != -1) {
          fos.write(b, 0, len);
        }
        fos.close();
        fis.close();
      }
    }
  }

  public static void ZipFile(String zipFileName, String inputFileName)
      throws Exception {
    org.apache.tools.zip.ZipOutputStream out = new org.apache.tools.zip.ZipOutputStream(
        new FileOutputStream(zipFileName));
    out.setEncoding("utf-8");//设置的和文件名字格式一样或开发环境编码设置一样的话就能正常显示了
    File inputFile = new File(inputFileName);
    zip(out, inputFile, "", true);
    System.out.println("zip done");
    out.close();
  }

  public static void unZipFile(String unZipFileName, String unZipPath)
      throws Exception {
    org.apache.tools.zip.ZipFile zipFile = new org.apache.tools.zip.ZipFile(
        unZipFileName, "utf-8");
    unZipFileByOpache(zipFile, unZipPath);
    System.out.println("unZip Ok");
  }
}
