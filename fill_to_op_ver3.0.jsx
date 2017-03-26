var a = new Array();
a = app.selection;
app.selection = null;

for(var j=0; j < a.length; j++)
{
a[j].opacity = 100 - a[j].fillColor.gray;
}//endfor