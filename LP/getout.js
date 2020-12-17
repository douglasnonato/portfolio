/*  
 *  Change the passwords and urls here
 *  Make sure the passwords and urls are in the same order
 */

 var vid = document.getElementById("myVideo"); 

  function playVid() { 
      vid.play(); 
  } 

 function question1() {
  var ahx = "A";
  var aa = document.getElementById("aa").value;
  var ab = document.getElementById("ab").value;
  var abx = "O";
  var ac = document.getElementById("ac").value;
  var ad = document.getElementById("ad").value;
  var adx = "A";
  var ae = document.getElementById("ae").value;
  var af = document.getElementById("af").value;
  var ag = document.getElementById("ag").value;
  var agx = "S";
  var ah = document.getElementById("ah").value;

  var ba = document.getElementById("ba").value;
  var afx = "I";
  var bax = "D";
  var bb = document.getElementById("bb").value;
  var acx = "N";
  var bbx = "O";
  var bc = document.getElementById("bc").value;
  var cbx = "A";
  var aax = "M";
  var bcx = "U";
  var bd = document.getElementById("bd").value;
  var be = document.getElementById("be").value;
  var bex = "L";
  var bf = document.getElementById("bf").value;
  var bfx = "A";
  var bg = document.getElementById("bg").value;
  var bgx = "S";

  var bdx = "G";
  var ca = document.getElementById("ca").value;
  var cax = "K";
  var cb = document.getElementById("cb").value;
  var cc = document.getElementById("cc").value;
  var ccx = "X";
  var cd = document.getElementById("cd").value;
  var dax = "C";
  var cdx = "A";
  var aex = "L";

  var da = document.getElementById("da").value;
  var db = document.getElementById("db").value;
  var dbx = "O";
  var dc = document.getElementById("dc").value;
  var ddx = "L";
  var ecx = "L";
  var dcx = "E";
  var dd = document.getElementById("dd").value;
  var de = document.getElementById("de").value;
  var dex = "H";
  var df = document.getElementById("df").value;
  var dfx = "O";

  var ea = document.getElementById("ea").value;
  var eax = "S";
  var eb = document.getElementById("eb").value;
  var ebx = "U";
  var ec = document.getElementById("ec").value;

  if (aa == aax && ab == abx && ac == acx && ad == adx && ae == aex && af == afx && ag == agx && ah == ahx && ba == bax && bb == bbx && bc == bcx && bd == bdx && be == bex && bf == bfx && bg == bgx && ca == cax && cb == cbx && cc == ccx && cd == cdx && da == dax && db == dbx && dc == dcx && dd == ddx && de == dex && df == dfx && ea == eax && eb == ebx && ec == ecx) {
      // playVid();
      document.getElementById("container_inner").style.setProperty('opacity','1');
      document.getElementById("wrap_inner").style.setProperty('z-index','1');
      document.getElementById("myVideo").style.setProperty('z-index','1');
      document.getElementById("overlay").style.setProperty('opacity','.9');
      document.getElementById("overlay").style.setProperty('z-index','1');
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } else {
      window.alert("Parece que ainda falta algo! Volte e tente novamente");
    }
  }

