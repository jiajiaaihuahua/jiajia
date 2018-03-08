/*     */ package core.utils;
/*     */ 
/*     */ import com.google.common.collect.Lists;
/*     */ import java.io.BufferedInputStream;
/*     */ import java.io.BufferedOutputStream;
/*     */ import java.io.File;
/*     */ import java.io.FileInputStream;
/*     */ import java.io.FileOutputStream;
/*     */ import java.io.FilenameFilter;
/*     */ import java.io.IOException;
/*     */ import java.net.URLEncoder;
/*     */ import java.util.Collections;
/*     */ import java.util.LinkedList;
/*     */ import java.util.List;
/*     */ import javax.servlet.http.HttpServletResponse;
/*     */ import net.lingala.zip4j.core.ZipFile;
/*     */ import net.lingala.zip4j.exception.ZipException;
/*     */ import org.apache.commons.io.FileUtils;
/*     */ import org.springframework.http.HttpHeaders;
/*     */ import org.springframework.http.HttpStatus;
/*     */ import org.springframework.http.MediaType;
/*     */ import org.springframework.http.ResponseEntity;
/*     */ import org.springframework.web.multipart.MultipartFile;
/*     */ import org.tshark.core.dto.Tree;
/*     */ import org.tshark.core.exception.TSharkException;
/*     */ 
/*     */ public class FileUtil
/*     */ {
/*     */   public static List<String> getFilesFromDir(String path, String ext)
/*     */   {
/*  31 */     LinkedList<String> fileList = new LinkedList();
/*  32 */     File dir = new File(path);
/*  33 */     String[] files = dir.list(new FilenameFilter() {
/*     */       public boolean accept(File dir, String name) {
/*  35 */         return name.endsWith(val$ext);
/*     */       }
/*     */     });
/*     */     
/*  39 */     if (files == null) {
/*  40 */       return fileList;
/*     */     }
/*     */     
/*  43 */     Collections.addAll(fileList, files);
/*     */     
/*  45 */     return fileList;
/*     */   }
/*     */   
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */   public static String getFileSeparator()
/*     */   {
/*  54 */     return System.getProperty("file.separator");
/*     */   }
/*     */   
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */   public static String getFileExtName(String filename)
/*     */   {
/*  64 */     if ((filename != null) && (filename.length() > 0)) {
/*  65 */       int dot = filename.lastIndexOf('.');
/*  66 */       if ((dot > -1) && (dot < filename.length() - 1))
/*     */       {
/*  68 */         return filename.substring(dot);
/*     */       }
/*     */     }
/*  71 */     return filename;
/*     */   }
/*     */   
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */   public static String getRandomFileNameByDate()
/*     */   {
/*  80 */     return DateUtil.getSysDateString("yyyyMMddHHmmssS");
/*     */   }
/*     */   
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */   public static void makeDir(String pathName)
/*     */   {
/*  89 */     File file = new File(pathName);
/*     */     
/*  91 */     if ((file.exists()) && (file.isDirectory())) {
/*  92 */       return;
/*     */     }
/*     */     
/*  95 */     file.mkdirs();
/*     */   }
/*     */   
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */   public static String saveFile(MultipartFile file, String saveFilePath, String fileNewName)
/*     */   {
/* 105 */     if (file == null) {
/* 106 */       return null;
/*     */     }
/*     */     
/*     */ 
/* 110 */     String fileExtName = getFileExtName(file.getOriginalFilename());
/*     */     
/*     */     try
/*     */     {
/*     */       String finalFileName;
/*     */       String finalFileName;
/* 116 */       if (fileNewName == null)
/*     */       {
/* 118 */         finalFileName = getRandomFileNameByDate() + fileExtName;
/*     */       } else {
/* 120 */         finalFileName = fileNewName + fileExtName;
/*     */       }
/*     */       
/*     */ 
/* 124 */       makeDir(saveFilePath);
/*     */       
/* 126 */       String uploadFile = saveFilePath + finalFileName;
/*     */       
/*     */ 
/* 129 */       FileOutputStream fileOS = new FileOutputStream(uploadFile);
/* 130 */       fileOS.write(file.getBytes());
/* 131 */       fileOS.close();
/*     */     } catch (Exception e) {
/* 133 */       throw new TSharkException(e); }
/*     */     String finalFileName;
/*     */     FileOutputStream fileOS;
/* 136 */     return finalFileName;
/*     */   }
/*     */   
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */   public static void deleteFile(String deleteFilePath)
/*     */   {
/* 145 */     File file = new File(deleteFilePath);
/*     */     
/* 147 */     if ((file.exists()) && (file.isFile())) {
/* 148 */       file.delete();
/*     */     }
/*     */   }
/*     */   
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */   public static void downloadFile(HttpServletResponse response, String sourcePathFileName, String contentType, String downloadFileName)
/*     */     throws Exception
/*     */   {
/* 162 */     BufferedInputStream bis = null;
/* 163 */     BufferedOutputStream bos = null;
/*     */     
/* 165 */     long fileLength = new File(sourcePathFileName).length();
/*     */     
/* 167 */     response.setContentType(contentType);
/* 168 */     String fileName = URLEncoder.encode(downloadFileName, "utf-8");
/*     */     
/* 170 */     response.setHeader("Content-disposition", "attachment;filename=" + fileName);
/* 171 */     response.setHeader("Content-Length", String.valueOf(fileLength));
/*     */     
/* 173 */     bis = new BufferedInputStream(new FileInputStream(sourcePathFileName));
/* 174 */     bos = new BufferedOutputStream(response.getOutputStream());
/* 175 */     byte[] buff = new byte['?'];
/*     */     int bytesRead;
/* 177 */     while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
/* 178 */       bos.write(buff, 0, bytesRead);
/*     */     }
/* 180 */     bis.close();
/* 181 */     bos.close();
/*     */   }
/*     */   
/*     */   public static ResponseEntity<byte[]> previewFile(String filePath, String contentType) {
/* 185 */     File previewFile = new File(filePath);
/*     */     try
/*     */     {
/* 188 */       byte[] pdfFileBytes = FileUtils.readFileToByteArray(previewFile);
/*     */       
/* 190 */       HttpHeaders httpHeaders = new HttpHeaders();
/* 191 */       httpHeaders.setContentType(MediaType.valueOf(contentType));
/* 192 */       httpHeaders.setContentLength(pdfFileBytes.length);
/* 193 */       httpHeaders.add("Accept-Ranges", "bytes");
/*     */       
/* 195 */       return new ResponseEntity(pdfFileBytes, httpHeaders, HttpStatus.OK);
/*     */     } catch (IOException e) {
/* 197 */       throw new TSharkException("文件预览失败！");
/*     */     }
/*     */   }
/*     */   
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */   public static void copyFile(File sourceFile, File targetFile)
/*     */     throws IOException
/*     */   {
/* 210 */     if ((!sourceFile.exists()) || (!sourceFile.isFile())) {
/* 211 */       return;
/*     */     }
/*     */     
/*     */ 
/* 215 */     FileInputStream input = new FileInputStream(sourceFile);
/* 216 */     BufferedInputStream inBuff = new BufferedInputStream(input);
/*     */     
/*     */ 
/* 219 */     String fullPath = targetFile.getPath();
/* 220 */     String targetFilePath = fullPath.substring(0, fullPath.lastIndexOf("/"));
/*     */     
/*     */ 
/* 223 */     makeDir(targetFilePath);
/*     */     
/*     */ 
/* 226 */     FileOutputStream output = new FileOutputStream(targetFile);
/* 227 */     BufferedOutputStream outBuff = new BufferedOutputStream(output);
/*     */     
/*     */ 
/* 230 */     byte[] b = new byte['?'];
/*     */     int len;
/* 232 */     while ((len = inBuff.read(b)) != -1) {
/* 233 */       outBuff.write(b, 0, len);
/*     */     }
/*     */     
/* 236 */     outBuff.flush();
/*     */     
/*     */ 
/* 239 */     inBuff.close();
/* 240 */     outBuff.close();
/* 241 */     output.close();
/* 242 */     input.close();
/*     */   }
/*     */   
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */   public static void cutFile(File sourceFile, File targetFile)
/*     */   {
/*     */     try
/*     */     {
/* 255 */       copyFile(sourceFile, targetFile);
/*     */     } catch (Exception e) {
/* 257 */       throw new TSharkException(e);
/*     */     }
/*     */     
/*     */ 
/* 261 */     deleteFile(sourceFile.getPath());
/*     */   }
/*     */   
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */   public static void copyDirectory(String sourceDir, String targetDir)
/*     */     throws IOException
/*     */   {
/* 273 */     new File(targetDir).mkdirs();
/*     */     
/*     */ 
/* 276 */     File[] files = new File(sourceDir).listFiles();
/*     */     
/* 278 */     if (files == null) {
/* 279 */       return;
/*     */     }
/*     */     
/* 282 */     for (File file : files) {
/* 283 */       if (file.isFile())
/*     */       {
/* 285 */         File targetFile = new File(new File(targetDir).getAbsolutePath() + File.separator + file.getName());
/*     */         
/* 287 */         copyFile(file, targetFile);
/*     */       }
/* 289 */       if (file.isDirectory())
/*     */       {
/* 291 */         String dir1 = sourceDir + "/" + file.getName();
/*     */         
/* 293 */         String dir2 = targetDir + "/" + file.getName();
/* 294 */         copyDirectory(dir1, dir2);
/*     */       }
/*     */     }
/*     */   }
/*     */   
/*     */ 
/*     */ 
/*     */ 
/*     */   public static void unzipFile(File zipFile, String newFilePath)
/*     */   {
/*     */     try
/*     */     {
/* 306 */       ZipFile unzipFile = new ZipFile(zipFile);
/*     */       
/* 308 */       unzipFile.setFileNameCharset("GBK");
/*     */       
/* 310 */       if (!unzipFile.isValidZipFile()) {
/* 311 */         throw new TSharkException("ZIP文件解压失败，文件已损坏！");
/*     */       }
/*     */       
/* 314 */       File file = new File(newFilePath);
/*     */       
/*     */ 
/* 317 */       if ((file.isDirectory()) && (!file.exists())) {
/* 318 */         file.mkdir();
/*     */       }
/*     */       
/*     */ 
/* 322 */       unzipFile.extractAll(newFilePath);
/*     */     } catch (ZipException e) {
/* 324 */       throw new TSharkException("ZIP文件解压失败，文件不存在！", e);
/*     */     }
/*     */   }
/*     */   
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */   public static String readFile(String filePath)
/*     */   {
/* 335 */     File file = new File(filePath);
/*     */     
/* 337 */     if ((!file.exists()) || (!file.isFile())) {
/* 338 */       throw new TSharkException("读取文件失败，文件不存在！");
/*     */     }
/*     */     
/*     */ 
/*     */ 
/*     */     try
/*     */     {
/* 345 */       fileContent = FileUtils.readFileToString(file, "UTF-8");
/*     */     } catch (IOException e) { String fileContent;
/* 347 */       throw new TSharkException("读取文件失败，文件格式错误！");
/*     */     }
/*     */     String fileContent;
/* 350 */     return fileContent;
/*     */   }
/*     */   
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */   public static List<Tree> getFileTrees(String fileDirectoryPath)
/*     */   {
/* 361 */     File file = new File(fileDirectoryPath);
/*     */     
/* 363 */     if (!file.isDirectory()) {
/* 364 */       throw new TSharkException("获取文件树失败，无效目录！");
/*     */     }
/*     */     
/*     */ 
/* 368 */     File[] fileDirectories = file.listFiles();
/*     */     
/* 370 */     if ((fileDirectories == null) || (fileDirectories.length == 0)) {
/* 371 */       throw new TSharkException("获取文件树失败，目录为空！");
/*     */     }
/*     */     
/*     */ 
/* 375 */     return getChildren(fileDirectories);
/*     */   }
/*     */   
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */   private static List<Tree> getChildren(File[] fileDirectories)
/*     */   {
/* 385 */     if ((fileDirectories == null) || (fileDirectories.length == 0)) {
/* 386 */       return null;
/*     */     }
/*     */     
/* 389 */     List<Tree> children = Lists.newArrayList();
/*     */     
/* 391 */     for (File fileDirectory : fileDirectories)
/*     */     {
/* 393 */       if (!fileDirectory.isHidden())
/*     */       {
/*     */ 
/*     */ 
/*     */ 
/* 398 */         Tree tree = wrapFileTree(fileDirectory);
/*     */         
/*     */ 
/* 401 */         if (fileDirectory.isDirectory())
/*     */         {
/* 403 */           tree.setChildren(getChildren(fileDirectory.listFiles()));
/*     */         }
/*     */         
/* 406 */         children.add(tree);
/*     */       }
/*     */     }
/* 409 */     return children;
/*     */   }
/*     */   
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */ 
/*     */   private static Tree wrapFileTree(File file)
/*     */   {
/*     */     try
/*     */     {
/* 423 */       tree = new Tree(file.getCanonicalFile().toString(), file.getName());
/*     */     } catch (IOException e) { Tree tree;
/* 425 */       throw new TSharkException("获取文件树失败，子文件路径错误！");
/*     */     }
/*     */     Tree tree;
/* 428 */     return tree;
/*     */   }
/*     */ }

