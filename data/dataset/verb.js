/********************************************************************/

jsMath.Package(jsMath.Parser,{
  
  macros: {verb: 'Verb'},
  
  /*
   *  Implement \verb|...|
   */
  Verb: function (name) {
    var c = this.GetNext(); var start = ++this.i;
    if (c == "" ) {this.Error(this.cmd+name+" requires an argument"); return}
    while (this.i < this.string.length && this.string.charAt(this.i) != c) {this.i++}
    if (this.i == this.string.length) 
      {this.Error("Can't find closing delimiter for "+this.cmd+name); return}
    var text = this.string.slice(start,this.i); this.i++;
    text = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    text = '<span style="font-family:monospace">'+text+'</span>';
    var box = jsMath.Box.Text(text,'normal','T',this.mlist.data.size).Styled();
    box.h = box.bh+box.bd -jsMath.d; box.d = jsMath.d;
    this.mlist.Add(jsMath.mItem.Typeset(box));
  }
});
