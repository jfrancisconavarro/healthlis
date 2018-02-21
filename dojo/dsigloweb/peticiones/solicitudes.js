define(["dojo/_base/declare",
"dijit/layout/ContentPane",
"dijit/form/ValidationTextBox",
"dijit/form/DateTextBox",
"dijit/form/ComboBox",
"dojo/store/Memory",
"dijit/form/SimpleTextarea",
"dijit/form/CheckBox",
"dijit/Fieldset",
"dijit/form/Button",
"dojo/request",
"dijit/ConfirmDialog",
"dojo/dom-form",
"dojox/grid/DataGrid",
"dojo/i18n!dsigloweb/nls/general",
"dijit/registry",
"dojo/date",
"dojox/form/ListInput",
"dsigloweb/peticiones/demo",
"dsigloweb/peticiones/extra",
"dojo/on",
"dojo/domReady!"], function(declare,ContentPane,ValidationTextBox,DateTextBox,ComboBox,Memory,SimpleTextarea,CheckBox,Fieldset,Button,request,ConfirmDialog,
domcp1,DataGrid,i18n,registry,date,ListInput,ddemo,eextra,on){
  return declare(null, {
  	padreSolicitudes:null,
  	wdemo:null,
  	wextra:null,
  	beep:null, 
  	contenedor:function () 
	{
		wdemo = new ddemo();
		wextra = new eextra();
		padreSolicitudes = this;
   	beep=new Audio('/audio.mp3');
		this.elementoscd;
		this.elementosvalcd;
		this.itcd;
		cp1 = new ContentPane({
        region: "top",
        id: "cpsol",
        content: "<div style='text-align: center;'><b>Creación de Peticiones</b></div>"
		},dojo.doc.createElement('div'));
		nodo=document.getElementById("cpescritorio");
	   nodo.appendChild(cp1.domNode); 
	},
	dform:function () 
	{
		form = new dijit.form.Form({
			id: "formsol",
			encType: "multipart/form-data",
			action: "",
			method: "POST"
	   }, dojo.doc.createElement('div'));
      cp1.domNode.appendChild(form.domNode);
	},
	efield: function () 
	{
		efieldsetfiltro = new Fieldset({
			title: "Peticiones",
			style: "width:80%; padding: 10px; margin: 10px;"
		});
		form.domNode.appendChild(efieldsetfiltro.domNode);	
	},
	dinfo:function () 
	{
		dialogo = new ConfirmDialog({
            // Dialog title
            title: "Advertencia",
        });
	},
	esid:function () 
	{
		sid = new ValidationTextBox({
        name:"sid",
        type:"text",
        id:"sid",
		  readonly:false,
		  style: "width:100px;",
		  required: true
	   }, dojo.doc.createElement('input'));
	   efieldsetfiltro.domNode.appendChild(sid.domNode);
	   dojo.place('<label for="sid">Análisis: </label>', dojo.byId('widget_sid'), 'before');
	   //Eventos sid
	   sid.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		} 
		}, true);
		sid.on("Change", function(evt)
		{
			wdemo.vsid();
		}, true);
	},
	efecha:function () 
	{
		fecha = new DateTextBox({
        	type:"text",
        	name:"fecha",
        	id:"fecha",
        	required:true,
        	style:"width: 8em;",
        	lang:"es",
        	promptMessage: "dd/mm/yyyy",
    		invalidMessage: "cp1ato de fecha invalido. Usar dd/mm/yyyy"        	
   	}, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(fecha.domNode);
   	dojo.place('<label for="fecha">Fecha: </label>', dojo.byId('widget_fecha'), 'before');
   	//Eventos fecha
	   fecha.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);		
	},
	epid:function () {
		pid = new ValidationTextBox({
        	type:"text",
        	name:"pid",
        	id:"pid",
        	required:false,
			uppercase:true,
        	style:"width: 9em;"
      }, dojo.doc.createElement('input'));
	   efieldsetfiltro.domNode.appendChild(pid.domNode);
	   dojo.place('<label for="pid">DNI: </label>', dojo.byId('widget_pid'), 'before');
	   //Eventos pid
	   pid.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);
	},	
	enombre:function () {
		nombre = new ValidationTextBox({
        	type:"text",
        	name:"nombre",
        	id:"nombre",
        	required:true,
			uppercase:true,
        	style:"width: 15em;",
        	missingMessage:"Falta Nombre"       	
   	}, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(nombre.domNode);
   	dojo.place('<label for="nombre">Nombre: </label>', dojo.byId('widget_nombre'), 'before');
		//Eventos nombre
	   nombre.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);
   },
   eape1:function () {		
		ape1 = new ValidationTextBox({
        	type:"text",
        	name:"ape1",
        	id:"ape1",
        	required:true,			
			uppercase:true,
        	style:"width: 15em;",
        	missingMessage:"Falta primer apellido",
   	}, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(ape1.domNode);
		dojo.place('<label for="ape1">Apellido 1: </label>', dojo.byId('widget_ape1'), 'before'); 
		//Eventos ape1
	   ape1.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);
   },
	eape2:function () {				
		ape2 = new ValidationTextBox({
        	type:"text",
        	name:"ape2",
        	id:"ape2",
        	required:false,			
			uppercase:true,
        	style:"width: 15em;"
   	}, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(ape2.domNode);
   	dojo.place('<label for="ape2">Apellido 2:</label>', dojo.byId('widget_ape2'), 'before');
   	//Eventos ape2
	   ape2.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);	
	},
	eedad:function () {
		edad = new ValidationTextBox({
        	type:"text",
        	name:"edad",
        	id:"edad",
        	style:"width: 2em;",
        	disabled:true,
        	required:true,
        	missingMessage:"Falta edad"
   	}, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(edad.domNode);
   	dojo.place('<label for="edad">Edad: </label>', dojo.byId('widget_edad'), 'before');
   	//Eventos edad
	   edad.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);
   },
   efnac:function () {
	   fnac = new DateTextBox({
	     	type:"text",
	     	name:"fnac",
	     	id:"fnac",
			style:"width: 8em;",
			lang:"es",
	     	required:true,
			promptMessage: "dd/mm/yyyy",
    		invalidMessage: "cp1ato de fecha invalido. Usar dd/mm/yyyy"
	   }, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(fnac.domNode);
   	dojo.place('<label for="fnac">F. Nacimiento: </label>', dojo.byId('widget_fnac'), 'before');
   	//Eventos fnac
	   fnac.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);
   },
	esexo:function () {
		sexo = new ComboBox({
        	type:"text",
        	name:"sexo",
        	id:"sexo",
        	style:"width: 5em;",
        	required:true,
        	searchAttr:"name",
        	missingMessage:"Falta sexo",
        	labelAttr: "etiqueta",
         labelType: "html"
   	}, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(sexo.domNode);
   	dojo.place('<label for="sexo">Sexo: </label>', dojo.byId('widget_sexo'), 'before');  
   	//Carga valores de sexo
   	wdemo.csexo();
   	//Eventos sexo
	   sexo.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);	  	
   },
   edemo0:function () { 
		demo0 = new ValidationTextBox({
        	type:"text",
        	name:"demo0",
        	id:"demo0",
        	required:false,
			searchAttr:"busqueda",
			uppercase:true,
        	style:"width: 15em;",
        	labelAttr: "etiqueta",
         labelType: "html"
   	}, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(demo0.domNode);
   	dojo.place('<label for="demo0">Nº Episodio: </label>', dojo.byId('widget_demo0'), 'before');
   	//Eventos demo0
	   demo0.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);
   	
	},
	edemo1:function () { 
		demo1 = new ComboBox({
        	type:"text",
        	name:"demo1",
        	id:"demo1",
        	required:false,
			searchAttr:"busqueda",
			uppercase:true,
        	style:"width: 15em;",
        	labelAttr: "etiqueta",
         labelType: "html"
   	}, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(demo1.domNode);
   	dojo.place('<label for="demo1">Origen: </label>', dojo.byId('widget_demo1'), 'before');
   	//Cargo contenido demo1
   	wdemo.cdemo1();
   	//Eventos demo1
	   demo1.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);   	
	},
	edemo2:function () { 
		demo2 = new ComboBox({
        	type:"text",
        	name:"demo2",
        	id:"demo2",
        	required:false,
			searchAttr:"busqueda",
			uppercase:true,
        	style:"width: 15em;",
        	labelAttr: "etiqueta",
         labelType: "html"
   	}, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(demo2.domNode);
   	dojo.place('<label for="demo2">Médico: </label>', dojo.byId('widget_demo2'), 'before');
   	//Cargo contenido demo2
   	wdemo.cdemo2(); 
		//Eventos demo2
	   demo2.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);  	
	},
	edemo3:function () { 
		demo3 = new ComboBox({
        	type:"text",
        	name:"demo3",
        	id:"demo3",
        	required:false,
			searchAttr:"busqueda",
			uppercase:true,
        	style:"width: 15em;",
        	labelAttr: "etiqueta",
         labelType: "html"
   	}, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(demo3.domNode);
   	dojo.place('<label for="demo3">Sede: </label>', dojo.byId('widget_demo3'), 'before');
   	//Cargo contenido demo3
   	wdemo.cdemo3();
   	//Eventos demo3
	   demo3.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);
	},
	edemo4:function () { 
		demo4 = new ValidationTextBox({
        	type:"text",
        	name:"demo4",
        	id:"demo4",
        	required:false,			
			uppercase:true,
        	style:"width: 15em;"
   	}, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(demo4.domNode);
   	dojo.place('<label for="demo4">Referencia: </label>', dojo.byId('widget_demo4'), 'before');
   	//Eventos demo4
	   demo4.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);   	
	},
	edemo5:function () { 
		demo5 = new ComboBox({
        	type:"text",
        	name:"demo5",
        	id:"demo5",
        	required:false,
			searchAttr:"busqueda",
			uppercase:true,
        	style:"width: 15em;",
        	labelAttr: "etiqueta",
         labelType: "html"
   	}, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(demo5.domNode);
   	dojo.place('<label for="demo5">Procedencia: </label>', dojo.byId('widget_demo5'), 'before');
   	//Cargo contenido demo5
   	wdemo.cdemo5();   	
		//Eventos demo5
	   demo5.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);
	},
	edemo6:function () { 
		demo6 = new ValidationTextBox({
        	type:"text",
        	name:"demo6",
        	id:"demo6",
        	required:false,			
			uppercase:true,
        	style:"width: 15em;"
   	}, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(demo6.domNode);
   	dojo.place('<label for="demo6">Diagnóstico: </label>', dojo.byId('widget_demo6'), 'before');
   	//Eventos demo6
	   demo6.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);
	},
	edemo7:function () { 
		demo7 = new ValidationTextBox({
        	type:"text",
        	name:"demo7",
        	id:"demo7",
        	required:false,
			uppercase:true,
        	style:"width: 10em;"
   	}, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(demo7.domNode);
   	dojo.place('<label for="demo7">Cama: </label>', dojo.byId('widget_demo7'), 'before');
   	//Eventos demo7
	   demo7.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);
	},
	edemo8:function () { 
		demo8 = new ComboBox({
        	type:"text",
        	name:"demo8",
        	id:"demo8",
        	required:false,
			searchAttr:"busqueda",
			uppercase:true,
        	style:"width: 10em;",
        	labelAttr: "etiqueta",
         labelType: "html"
   	}, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(demo8.domNode);
   	dojo.place('<label for="demo8">Urgente: </label>', dojo.byId('widget_demo8'), 'before');
   	//Cargo contenido demo8
   	wdemo.cdemo8();   	
   	//Eventos demo8
	   demo8.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);
	},
	edemo9:function () { 
		demo9 = new ComboBox({
        	type:"text",
        	name:"demo9",
        	id:"demo9",
        	required:false,
			searchAttr:"busqueda",
			uppercase:true,
        	style:"width: 15em;",
        	labelAttr: "etiqueta",
         labelType: "html"
   	}, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(demo9.domNode);
   	dojo.place('<label for="demo9">Origen Externo: </label>', dojo.byId('widget_demo9'), 'before');
   	//Cargo contenido demo9
   	wdemo.cdemo9();
   	//Eventos demo9
	   demo9.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);
	},
	eextra0:function () {   
		extra0 = new ValidationTextBox({
	        	type:"text",
	        	name:"extra0",
	        	id:"extra0",
	        	style:"width: 12em;",
	        	required:false,
				uppercase:true
	   	}, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(extra0.domNode);
   	dojo.place('<label for="extra0">Teléfono: </label>', dojo.byId('widget_extra0'), 'before');
   	//Eventos extra0
	   extra0.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);
	},
	eextra1:function () {   
		extra1 = new ValidationTextBox({
	        	type:"text",
	        	name:"extra1",
	        	id:"extra1",
	        	style:"width: 12em;",
	        	required:false,
				uppercase:true
	   	}, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(extra1.domNode);
   	dojo.place('<label for="extra1">Nº Historia: </label>', dojo.byId('widget_extra1'), 'before');
   	//Eventos extra1
	   extra1.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);
	},
	eextra2:function () {   
		extra2 = new ValidationTextBox({
	        	type:"text",
	        	name:"extra2",
	        	id:"extra2",
	        	style:"width: 12em;",
	        	required:false,
				uppercase:true
	   	}, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(extra2.domNode);
   	dojo.place('<label for="extra2">Varios: </label>', dojo.byId('widget_extra2'), 'before');
   	//Eventos extra2
	   extra2.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);
	},
	eextra3:function () {   
		extra3 = new ValidationTextBox({
	        	type:"text",
	        	name:"extra3",
	        	id:"extra3",
	        	style:"width: 20em;",
	        	required:false,
				uppercase:true
	   	}, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(extra3.domNode);
   	dojo.place('<label for="extra3">Especialidad: </label>', dojo.byId('widget_extra3'), 'before');
   	//Eventos extra3
	   extra3.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);
	},
	eextra4:function () {   
		extra4 = new ValidationTextBox({
	        	type:"text",
	        	name:"extra4",
	        	id:"extra4",
	        	style:"width: 20em;",
	        	required:false,
				uppercase:true
	   	}, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(extra4.domNode);
   	dojo.place('<label for="extra4">e-mail: </label>', dojo.byId('widget_extra4'), 'before');
   	//Eventos extra4
	   extra4.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);
	},
	epwd:function () {
   	pwd = new ValidationTextBox({
        	type:"text",
        	name:"epwd",
        	id:"epwd",
        	required:false,
        	uppercase:true,
        	style:"width: 5em;"
   	}, dojo.doc.createElement('input'));
   	efieldsetfiltro.domNode.appendChild(pwd.domNode);
   	dojo.place('<label for="epwd"> Password:</label>', dojo.byId('widget_epwd'), 'before');
   	//Eventos pwd
	   pwd.on("KeyUp", function(evt)
		{
			if(evt.keyCode==13)
    		{
				padreSolicitudes.elementoscd[padreSolicitudes.itcd].focus();
				padreSolicitudes.itcd++;
    		}
		}, true);
   },
   eprueba:function () {
 		prueba = new ComboBox({
			name:"eprueba",
   		id:"eprueba",
   		size:"10",
   		style: "width:25%;",
       	searchAttr: "codigo",
       	required: false,
			uppercase:true,
			labelAttr: "etiqueta",
         labelType: "html"
 		});
		efieldsetfiltro.domNode.appendChild(prueba.domNode);
		dojo.place('<label for="eprueba">Pruebas: </label>', dojo.byId('widget_eprueba'), 'before');	
		wextra.cpruebas();	
		//Eventos prueba
	   prueba.on("KeyUp", function(evt)
		{
			/*if(evt.keyCode==113)
    		{
    			if (typeof Barray != 'undefined')
		 		{
    				while (Barray.length) { Barray.pop(); }
    			}
				Barray = [];
	         Barray[0]=prueba.get("value");
    			wbusc.settipo("pruebas",Barray);
    			wbusc.mostrar();
    		}*/
    		if(evt.keyCode==171) //+ -> @
    		{
    			//console.log("Tecla:"+evt.keyCode);
    			if( prueba.get("value").length>0 )
    			{
					prueba.set("value",prueba.get("value").slice(0, -1)+"@");
				}
				else
				{
					prueba.set("value","@");
				}
    		}
    		if(evt.keyCode==173) //- -> _
    		{
    			//console.log("Tecla:"+evt.keyCode);
				if( prueba.get("value").length>0 )
    			{
					prueba.set("value",prueba.get("value").slice(0, -1)+"_");
				}
				else
				{
					prueba.set("value","_");
				}
    		} 
    		if(evt.keyCode==17) //- -> _
    		{
    			pruebasStore.fetch({
		         query: { 
		         	codigo : prueba.get("value"),
		         	seccion : "MICRO" },
		         onComplete: function(items2)
		         {
	                dojo.forEach(items2,function(item2)
	                {					                	
	                		if( padreSolicitudes.anterior==prueba.get("value"))
		       				{
		       					pedidas.set('value',prueba.get("value")+":"+padreSolicitudes.ind+','+pedidas.get('value'),false);
		       					padreSolicitudes.ind++;
		       				}
		       				else
		       				{
		       					padreSolicitudes.ind=1;
		       					pedidas.set('value',prueba.get("value")+":"+padreSolicitudes.ind+','+pedidas.get('value'),false);
		       					padreSolicitudes.ind++;
									padreSolicitudes.anterior=prueba.get("value");
		       				}
	                });
		         }
			   }); 			
    		}       		
		}, true);   
		prueba.on("Change", function(evt)
		{
			if( prueba.get("value")==" " || prueba.get("value")=="" || prueba.get("value")==null )
     		{
        		//console.log("1");
     		}
     		else if( !isNaN(parseFloat(prueba.get("value"))) && isFinite(prueba.get("value")) )
     		{
				//Traduzco opcional a Prueba
				pruebasStore.fetch({
		         query: {opcional : prueba.get('value') },
		         onComplete: function(items){
			          wextra.vpruebas(items);
		         }			    
			   });        		
     		}
     		else
     		{
				pruebasStore.fetch({
		         query: {codigo : prueba.get('value') },
		         onComplete: function(items){
			          wextra.vpruebas(items);
		         }			    
			   });              		
     		}
		}, true);   
	},
	epedidas:function () {
		pedidas = new ListInput({
        		name:"epedidas",
   			id:"epedidas",
   			useAnim:false,
   			style: "width:90%;",
   			//readOnlyInput:true,
   			required: true,
				uppercase:true
    		});
    	efieldsetfiltro.domNode.appendChild(pedidas.domNode);
		dojo.place('<label for="epedidas">Solicitidas:</label>', dojo.byId('epedidas'), 'before');
	},
	baceptar:function () {
		aceptar = new Button({
			label: "Aceptar",
			type: "button"
		});
		efieldsetfiltro.domNode.appendChild(aceptar.domNode);
		//Eventos aceptar
	   aceptar.on("Click", function(evt)
		{
			wextra.vform();
		}, true);
	},
	bcancelar:function () {
		cancelar = new Button({
			label: "Cancelar",
			type: "button"
		});
		efieldsetfiltro.domNode.appendChild(cancelar.domNode);
		//Eventos cancelar
	   cancelar.on("Click", function(evt)
		{
			padreSolicitudes.limpiar();
		}, true);
	},
	bimprimir:function () {
		imprimir = new Button({
			label: "Imprimir",
			type: "button"
		});
		efieldsetfiltro.domNode.appendChild(imprimir.domNode);
		//Eventos imprimir
	   imprimir.on("Click", function(evt)
		{
			wextra.vvolex();
		}, true);
	},
	espera: function()
	{
		standby = new dojox.widget.Standby({
			target: "cp1sol",
          color: "#333",
          opacity: 0 
        });			
	   document.body.appendChild(standby.domNode);
	   standby.startup();
	},
	limpiar: function () 
   {
   	form.reset();
   	fecha.set('displayedValue',wutil.hoy(),false);
   },
	inicio: function () 
	{
		this.contenedor();
		this.dform();
		this.efield();
		this.dinfo();
		this.esid();
		this.efecha();
		this.edemo3();
		this.epid();
		efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("br"));
		this.eape1();
		this.eape2();
		this.enombre();
		efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("br"));		
		this.eedad();
		this.efnac();
		this.esexo();
		this.epwd();
		efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("br"));
		this.eextra0();
		this.eextra4();
		this.eextra2();
		efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("br"));
		this.edemo1();
		this.edemo9();
		efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("br"));
		this.edemo5();
		this.edemo8();
		this.edemo4();
		efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("br"));
		this.edemo2();
		this.eextra3();
		this.edemo6();		
		efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("br"));
		this.edemo0();
		this.edemo7();
		this.eextra1();
		efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("br"));
		this.eprueba();
		efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("br"));
		this.epedidas();
		efieldsetfiltro.domNode.appendChild(dojo.doc.createElement("br"));
		this.baceptar();
		this.bcancelar();
		this.bimprimir();
		this.elementoscd = [ sid, fecha, demo3, pid, ape1, ape2, nombre, fnac, sexo, pwd, extra0, extra4, extra2, demo1, demo9, demo5, demo8, demo4, demo2, extra3, demo6, demo0, demo7, extra1, prueba, aceptar ];
		this.elementosvalcd = [ sid, fecha, demo3, pid, ape1, ape2, edad, nombre, fnac, sexo, pwd, extra0, extra4, extra2, demo1, demo9, demo5, demo8, demo4, demo2, extra3, demo6, demo0, demo7, extra1, prueba, aceptar ];
		this.itcd = 1;
	}    
  });
});