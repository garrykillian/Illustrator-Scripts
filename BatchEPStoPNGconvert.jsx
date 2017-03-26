/////////////////////////////////////////////////////////////////
//Batch Convert EPS file to PNG 
//
//This script ask you to select folder with your EPS files. 
//Script also consider all files in subfolder of selected folder.
//
//PNG size is determined by artboard size of EPS file. 
//It makes PNG 5000px on long side.
//
//This script close eps files without saving them.
//
//Big thanks to all who helped with testing and improving this script.
//
// JS code (c) copyright: Alexander Rodionov  www.behance.net/GarryKillian
//////////////////////////////////////////////////////////////////

var df = new Folder('~/Desktop');
 
var topLevel = Folder.selectDialog('Please choose Folder with your EPS files…', df);
 
if (topLevel != null) {
 
     topLevel = topLevel.fsName
     var fileList = new Array();
 
     fileListRecursive(topLevel, /\.eps$/i);
 
     if (fileList.length > 0) {
          main();     
     } else {
          alert('There is NO Illustrator EPS files in folder you have selected!!');     
     }
}
 
function main() {
     with (app) {
          while (documents.length) {
                 activeDocument.close(SaveOptions.PROMPTTOSAVECHANGES);
            }
          for (var a = 0; a < fileList.length; a++) {
               var docRef = open(fileList[a]);
               with (docRef) {
                                var artWidth = app.activeDocument.width;
                                var artHeight = app.activeDocument.height;

                                 if (artWidth>=artHeight) 
                                 { // this part produce PNG image when the width of artboard is bigger the height
                                    var fileName = fullName.toString();
                                    var exportOptions = new ExportOptionsPNG24();
                                    
                                    var fileSpec = new File(fileName);
                                    exportOptions.antiAliasing = true;
                                    exportOptions.artBoardClipping = true;
                                    exportOptions.transparency = false;
                                    exportOptions.qualitySetting = 100;
                                    exportOptions.horizontalScale = (5000/artWidth)*100; 
                                    exportOptions.verticalScale = (5000/artWidth)*100;
                                    
                                    exportFile( fileSpec, ExportType.PNG24, exportOptions );
                                   }
                                else
                                {   // this part produce PNG image when the height of artboard is bigger the width
                                    var fileName = fullName.toString();
                                    var exportOptions = new ExportOptionsPNG24();
                                    
                                    var fileSpec = new File(fileName);
                                    exportOptions.antiAliasing = true;
                                    exportOptions.artBoardClipping = true;
                                    exportOptions.transparency = false;
                                    exportOptions.qualitySetting = 100;
                                    exportOptions.verticalScale = (5000/artHeight)*100;
                                    exportOptions.horizontalScale = (5000/artHeight)*100;
                                                
                                    exportFile( fileSpec, ExportType.PNG24, exportOptions );
                                }
                            close(SaveOptions.DONOTSAVECHANGES);
               }
          }          
         
     }
}
 
function fileListRecursive(f, exp) {          
     var t = Folder(f).getFiles();
     for (var i = 0; i < t.length; i++) {
          if (t[i] instanceof File && RegExp(exp).test(t[i].fsName)) fileList.push(t[i]);
          if (t[i] instanceof Folder) fileListRecursive(t[i].fsName, exp);
     }
}