function createBinaryString(nMask){
		//nMask must be between -2147483648 and 2147483647
		for(var nFlag = 0,nShifted = nMask,sMask = "";nFlag < 32;nFlag++,sMask += String(nShifted >>> 31),nShifted <<= 1);
		return sMask;
	}

	function ReturnBin(b){
		var bin = createBinaryString(b);
		return bin[28]+""+bin[29]+""+bin[30]+""+bin[31];
	}

	function bindec(bin) {
		//viene verificato che la stringa bin abbia una
		//lunghezza di 32 caratteri e che ogni carattere
		//di bin sia o 0 o 1 altrimenti la funzione
		//termina restituendo una stringa nulla
		if(bin.length>32) return "";
		var i;
		for(i=0; i<32; i++)
			if(bin.charAt(i)!="0" && bin.charAt(i)!="1") return "";
		var j, dec;
		//se il bit più significativo è uno 0 esegue
		//la conversione in numero decimale
		//se il bit più significativo è un 1 esegue
		//il complemento a 1 poi la somma binaria
		//con 1 e infine la conversione in numero
		//decimale
		if(bin.charAt(0)=="0")
			for(i=31, j=0; i>=bin.indexOf("1"); i--, j++)
			dec+=bin.charAt(i)*Math.pow(2, j);
		else{
			var tmp = "";
			for(i=0; i<32; i++){
			if(bin.charAt(i)=="0") tmp+="1";
			else tmp+="0";
		}
		bin = "";
		var rip = true;
		for(i=31; i>=0; i--){
				if(tmp.charAt(i)=="1" && rip) bin = "0"+bin;
			else if(tmp.charAt(i)=="0" && rip){
				bin = "1"+bin;
				rip = false;
			}else bin = tmp.charAt(i)+bin;
		}
		for(i=31, j=0; i>=bin.indexOf("1"); i--, j++)
			dec+=bin.charAt(i)*Math.pow(2, j);
		dec*=-1;
		}
		return dec;
	}

	function cBin(){ return ReturnBin(Math.floor(Math.random()*16)); }

	var n = 0;
	var flag = new Array(0,0,0,0);//init-step-exercise-calc
	var register = new Array("0","0000","0000","0000");//c-a-q-m
	var temp_register = new Array("0","0000","0000");//tc-ta-tq
	var exe_register = new Array("0","0000","0000");//exec-exea-exeq
	var espressione = /^[0-1]{4,4}$/;
	var espressione2 = /[0-1]{8, 8}/;
	var espressione3 = /[0-9]{1,}/;

	function IniText(){
		$(".addE").append('<tr><td></td><td>M</td><td></td><td class="hidel">Scorrimento a destra</td></tr>');
		$(".addE").append('<tr><td></td><td>'+register[3]+'</td><td></td><td class="hidel">Scorrimento a destra</td></tr>');
		$(".addE").append('<tr><td>'+register[0]+"</td><td>"+register[1]+"</td><td>"+register[2]+'</td><td class="hidel">Scorrimento a destra</td></tr>');
		$(".addE").append('<tr><td>C</td><td>A</td><td>Q</td><td class="hidel">Scorrimento a destra</td></tr>');
	}

	function SumB(){
		var somma = parseInt(temp_register[1],2)+parseInt(register[3],2);
		if(somma & 16) exe_register[0] = 1;
		exe_register[1] = (somma & 0xF).toString(2);
		exe_register[1] = parseInt(exe_register[1],2);
		exe_register[1] = ReturnBin(exe_register[1]);
	}

	function changeFlag(){ flag[1] = (flag[1] == 1) ? 0 : 1; }

	function setText(){
		$(".ec").text(temp_register[0]);
		$(".ea").text(temp_register[1]);
		$(".eq").text(temp_register[2]);
		$(".em").text(register[3]);
	}

	function copyRegister(){
		for(var i=0;i<3;i++) temp_register[i] = exe_register[i];
	}

	function ck(v,j){
		switch(v){
			case 0:
            	$("#info").text("L'ultimo bit di Q vale 1, si somma ad A il valore M.").show();
            	$(".elemento").css("background-image","url(img/molt-1.png)");
            break;
			case 1:
            	$("#info").text("L'ultimo bit di Q vale 0, si somma ad A il valore 0.").show();
                $(".elemento").css("background-image","url(img/molt-2.png)");
            break;
			case 2:
            	$("#info").text("Shift a destra dei Registri [C,A,Q] di una posizione.").show();
                $(".elemento").css("background-image","url(img/molt-3.png)");
            break;
		}
       if(j!=undefined){
         $('.ec').text($("#c"+j).text());
         $('.ea').text($("#ta"+j).text());
         $('.eq').text($("#tq"+j).text());
         	if(flag[2]){
            	$('.input_c').val($("#c"+j).text());
            	$('.input_a').val($("#ta"+j).text());
				$('.input_q').val($("#tq"+j).text());
                if($("#tqa"+j).html() == "Add") $('.input_select').val(1);
                else if($("#tqa"+j).html() == "Noadd") $('.input_select').val(2);
                else $('.input_select').val(3);
            }
       }
	}

	function Add(){
		if(n < 8){
			n++;
			changeFlag();
			if(temp_register[2][3] != 0){ SumB(); copyRegister(); }
			setText();
			ck((temp_register[2][3]==0) ? 1 : 0);
			$(".addE").append(
				'<tr id="tr'+n+'"><td id="c'+n+'">'+temp_register[0]+'</td><td id="ta'+n+'">'+temp_register[1]+'</td><td id="tq'+n+'">'+temp_register[2]+'</td><td class="ck"><a onclick="ck('+(1-temp_register[2][3])+','+n+')" id="tqa'+n+'">'+((temp_register[2][3]==0) ? "Noa" : "A")+"dd</a></td></tr>");
			if(flag[2]){
            	$('.input_c').val(temp_register[0]);
            	$('.input_a').val(temp_register[1]);
                $('.input_q').val(temp_register[2]);
                $('.input_select').val((temp_register[2][3]==0) ? 2 : 1);
            }
        }
	}

	function rBin(x,y){
		y = ReturnBin(Math.floor(parseInt(y,2)/2));
		y = x+y[1]+y[2]+y[3];
		return y;
	}

	function ShiftE(){
		var temp = temp_register[1][3];
		exe_register[1] = rBin(temp_register[0],temp_register[1]);
		exe_register[2] = rBin(temp,temp_register[2]);
		exe_register[0] = 0;
	}

	function Shift(){
		n++;
		changeFlag();
		ShiftE();
		temp_register[1] = exe_register[1];
		temp_register[2] = exe_register[2];
		temp_register[0] = 0;
		setText();
		ck(2);
		$(".addE").append('<tr id="tr'+n+'"><td id="c'+n+'">'+temp_register[0]+'</td><td id="ta'+n+'">'+temp_register[1]+'</td><td id="tq'+n+'">'+temp_register[2]+'</td><td class="ck"><a onclick="ck(2,'+n+')" id="tqa'+n+'">Scorrimento a destra</a></td></tr>');
		if(n == 8){
			$(".ea").css("color","#007FFF");
			$(".eq").css("color","#007FFF");
			$("#info").text("Calcolato il prodotto di "+register[2]+"x"+register[3]+" vale: "+temp_register[1]+""+temp_register[2]).show();
		}
        if(flag[2]){
          $('.input_c').val(temp_register[0]);
          $('.input_a').val(temp_register[1]);
          $('.input_q').val(temp_register[2]);
          $('.input_select').val(3);
        }
	}

	function Init(){
		Reset();        
        var q;
        do{
        	q = prompt("Moltiplicatore(Q)","1011");
        }while(!espressione.test(q) && q != null);

        if(q != '' && q != null){
        
        	var m;
            do{
                m = prompt("Moltiplicando(M)","1101");
            }while(!espressione.test(m) && m != null);
            if(m != '' && m != null){
            	flag[0] = 1;
            	register[2] = q;
                register[3] = m;
                temp_register[2] = register[2];
                for(var i=0;i<3;i++) exe_register[i] = temp_register[i];
                setText();
                IniText();
            }
        }
        
	}

	function Calc(){
    	Reset();        
        var q;
        do{
        	q = prompt("Moltiplicatore(Q)","1011");
        }while(!espressione.test(q) && q != null);
        if(q != '' && q != null){
        
        	var m;
            do{
                m = prompt("Moltiplicando(M)","1101");
            }while(!espressione.test(m) && m != null);
            if(m != '' && m != null){

            	var ss;
	            do{
	                ss = prompt("Intervallo tra step(Secondi)","1");
	            }while(!espressione3.test(ss) && ss != null);
	            if(ss != '' && ss != null){

	            	flag[0] = 1;
	            	register[2] = q;
	                register[3] = m;
	                temp_register[2] = register[2];
	                for(var i=0;i<3;i++) exe_register[i] = temp_register[i];
	                setText();
	                IniText();
	                
	                flag[3] = 1;
	                setTimeout(function(){ Step(1); }, ss*800);
	                setTimeout(function(){ Step(1); }, ss*1800);
	                setTimeout(function(){ Step(1); }, ss*2800);
	                setTimeout(function(){ Step(1); }, ss*3800);
	                setTimeout(function(){ Step(1); }, ss*4800);
	                setTimeout(function(){ Step(1); }, ss*5800);
	                setTimeout(function(){ Step(1); }, ss*6800);
	                setTimeout(function(){ Step(1); }, ss*7800);
            	}
            }
        }
    }

	function Step(j){
		if(flag[0] && ((flag[3] && j==1) || (!flag[3] && j==undefined))){
			switch(flag[1]){
				case 0:	Add(); break;
				case 1:	Shift(); break;
			}
			if(flag[3] && n==8) flag[3] = 0;
		}
	}

	function Back(){
		if(flag[0] && !flag[3]){
			if(n > 1){
				n--;
				changeFlag();

				temp_register[0] = $("#c"+n).html();
				temp_register[1] = $("#ta"+n).html();
				temp_register[2] = $("#tq"+n).html();

                if($("#tqa"+n).html() == "Add"){ ck(0); $(".elemento").css("background-image","url(img/molt-1.png)"); }
                else if($("#tqa"+n).html() == "Noadd"){ ck(1); $(".elemento").css("background-image","url(img/molt-2.png)"); }
                else{ ck(2); $(".elemento").css("background-image","url(img/molt-3.png)"); }
                if(n==0) $(".elemento").css("background-image","url(img/molt-0.png)");
				$("#tr"+(n+1)).remove();

			}else{
				var q = register[2];
				var m = register[3];
				Reset(1);
				flag[0] = 1;
				register[2] = temp_register[2] = q;
				register[3] = temp_register[3] = m;
				for(var i=0;i<3;i++) exe_register[i] = temp_register[i];
				IniText();
			}
            if(flag[2]){
            	$('.input_c').val(temp_register[0]);
            	$('.input_a').val(temp_register[1]);
				$('.input_q').val(n==0 ? "0000" : temp_register[2]);
                if($("#tqa"+n).html() == "Add") $('.input_select').val(1);
                else if($("#tqa"+n).html() == "Noadd") $('.input_select').val(2);
                else $('.input_select').val(n==0 ? 1 : 3);
            }
			setText();
			$(".ea").css("color","#000000");
			$(".eq").css("color","#000000");
		}
	}

	function Exe(){
		if(!flag[3]){
			if(!flag[2]){
				Reset();
				flag[0] = 1;
				temp_register[2] = register[2] = cBin();
				register[3]  = cBin();
				for(var i=0;i<3;i++) exe_register[i] = temp_register[i];
				setText();
				IniText();
				flag[2] = 1;
				$("#Exercise").show();
			}else{ Reset(); $("#Exercise").hide(); flag[2] = 0; }
		}
	}

	function ExeP(){
		if(flag[0] == 1 && flag[2] == 1){
			switch(flag[1]){
				case 0:	if(temp_register[2][3] != 0) SumB(); break;
				case 1:	ShiftE(); break;
			}
			if(
				$(".input_c").val() == exe_register[0] &&
				$(".input_a").val() == exe_register[1] && 
				$(".input_q").val() == exe_register[2] &&
				((((n+1)%2) != 0 && $(".input_select").val() == 1 && temp_register[2][3] != 0) ||
				(((n+1)%2) != 0 && $(".input_select").val() == 2 && temp_register[2][3] == 0) ||
				(((n+1)%2) == 0 && $(".input_select").val() == 3))
			){
				Step();
			}else if(n == 8){ $("#info").text("Complimenti.").show(); $("#Exercise").hide(); flag[2] = 0;  }
			else $("#info").text("Mi dispiace hai sbagliato.").show();
		}
	}

	function Reset(j){
		n = 0;
		$("#info").hide();
		if(j==undefined) $("#Exercise").hide();
		for(var i=0;i<4;i++) flag[i] = 0;
		for(var i=1;i<3;i++) register[i] = temp_register[i] = exe_register[i] = "0000";
		register[0] = temp_register[0] = exe_register[0] = 0; register[3] = "0000";
		setText();
		$(".addE").text("");
        $(".elemento").css("background-image","url(img/molt-0.png)");
	    $(".ea").css("color","#000000");
	    $(".eq").css("color","#000000");
	    if(j==1) flag[2] = 1;
        $('.input_c').val(temp_register[0]);
        $('.input_a').val(temp_register[1]);
		$('.input_q').val(temp_register[2]);
		$('.input_select').val(1);
	}

	function Help(){
		if(flag[0] == 1 && flag[2] == 1)
			ck($("select.input_select").val()-1);
	}

	function Guide(){
		$("#info").html('<div style="text-align:left;">'+"Prendiamo in esame il circuito in figura, permette d’eseguire il prodotto tra due numeri Q(Moltiplicatore) e M(Moltiplicando), il risultato si troverà mettendo insieme il registro A(cifre più significative) e Q(cifre meno significative).<br>Ad ogni passo, viene considerata l’ultima cifra di Q(q0).<br>Se il valore di q0 vale 1, allora viene sommato il valore del registro A con il valore del registro M, il risultato sostituirà il contenuto del registro A, l’eventuale trabocco viene memorizzatonel flip-flop C.<br>Se il valore di q0 vale 0, il contenuto del registro A non varia.<br>Alla fine di ciascun ciclo, [C,A e Q] scorrono a destra di una posizione.</div>").show();
	}

	$(document).ready(function(){
		$("html").keypress(function(event){
			var valuekey = event.charCode;
			var ako = String.fromCharCode(event.which);
			if(ako == "a" || ako == "A") Init();
			else if(ako == "c" || ako == "C") Calc();
			else if(ako == "e" || ako == "E") Exe();
			else if(ako == "p" || ako == "P") ExeP();
			else if(ako == "s" || ako == "S") Step();
			else if(ako == "b" || ako == "B") Back();
			else if(ako == "h" || ako == "H") Help();
			else if(ako == "r" || ako == "R") Reset();
		});
	});