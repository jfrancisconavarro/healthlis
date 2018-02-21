define(["dojo/_base/declare",
"dojo/on",
"dojo/domReady!"], function(declare, on){

return declare(null, {
  		getAge: function (d1,d2) //YYYY/MM/DD
		{
			var diff = Math.abs(d2.getTime()  - d1.getTime());
			return Math.ceil( diff / (1000 * 3600 * 24) );	
		},
		hoynf: function () 
		{
			var today = new Date();
			return today;	
		},
		hoyms: function () 
		{
			var today = new Date();
			return Date.parse(today);	
		},
		hoy: function ()
		{
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();
			
			if(dd<10) {
			    dd='0'+dd
			} 
			
			if(mm<10) {
			    mm='0'+mm
			} 
			
			today = dd+'/'+mm+'/'+yyyy;
			return today;
		},
		convfecha: function (d1) //DD/MM/YYYY to yyyymmdd
		{
			var ano = d1.substring(6,10);
			var mes = d1.substring(3,5);
			var dia = d1.substring(0,2);
			return ano+mes+dia;
		},	
		sum15fecha: function (d1) //DD/MM/YYYY
		{
			var ano = d1.substring(6,10);
			var mes = d1.substring(3,5);
			var dia = d1.substring(0,2);
			var sum = parseInt(dia);
			if( (parseInt(dia) - parseInt(15))<0 )
			{
				sum = sum + parseInt(15);
				mes = mes - parseInt(1);
			}
			else
			{
				sum = sum - parseInt(15);
			}
			
			//console.log("ini1"+ano+'/'+mes+'/'+dia+'.Suma:'+sum);
			if( mes == "02" )
			{
				if( sum>28)
				{
					sum=sum-28;
					mes=parseInt(mes)-parseInt(1);
				}
				//console.log("ini3"+ano+'/'+mes+'/'+dia+'.Suma:'+sum);
			}
			else if( mes%2 == 0 ) // 30 dias
			{
				if( sum>30)
				{
					sum=sum-30;
					mes=parseInt(mes)-parseInt(1);
					if( parseInt(mes)>12 )
					{ 
						mes = "1";
						ano = parseInt(ano) - parseInt(1);
					}				
				}
				//console.log("ini4"+ano+'/'+mes+'/'+dia+'.Suma:'+sum);
			}
			else
			{
				if( sum>31)
				{
					sum=sum-31;
					mes=parseInt(mes)-parseInt(1);
					if( parseInt(mes)>12 )
					{ 
						mes = "1";
						ano = parseInt(ano) - parseInt(1);
					}		
				}
				//console.log("ini5"+ano+'/'+mes+'/'+dia+'.Suma:'+sum);
			}
			dia=sum;
			dia=parseInt(dia);
			mes=parseInt(mes);
			ano=parseInt(ano);
			if( parseInt(dia)<10 ) dia = "0" +dia;
			if( parseInt(mes)<10 ) mes = "0" +mes;
			//console.log("ini6"+ano+'/'+mes+'/'+dia+'.Suma:'+sum);
			return ano+mes+dia; 
		},
		clave: function( campo )
		{
			letra='TWAGMYFPDX';
	      numero = Math.floor((Math.random() * 100000000)).toString();
	      resultado = numero[4] + letra[numero[1]] + numero[6] + letra[numero[3]] + numero[0] + letra[numero[5]] + numero[2];
	      campo.set('value',resultado);
		}
	});
});