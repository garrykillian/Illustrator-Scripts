var a = new Array();
a = app.selection;
app.selection = null;

for(var j=0; j < a.length; j++)
{
a[j].filled = true;
a[j].fillColor = a[j].strokeColor;
a[j].stroked= false;
}//endfor
