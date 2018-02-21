define(["dojo/_base/declare",
"dijit/layout/ContentPane",
"dijit/form/Form",
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
"dojo/cookie",
"dojox/widget/Standby",
"dijit/Dialog",
"dsigloweb/escritorio",
"dojo/i18n!dsigloweb/nls/login",
"dojo/dom-construct",
"dojo/on",
"dojo/domReady!"], function(declare,ContentPane,Form,ValidationTextBox,
DateTextBox,ComboBox,Memory,SimpleTextarea,CheckBox,Fieldset,Button,request,ConfirmDialog,
domForm,cookie,Standby,Dialog,Escritorio,i18n,domConstruct,on)
{
	//var privateValue = 0;
	return declare(null, 
	{
		padreLogin:null,
	    constructor: function(){
	      
	      padreLogin = this;	      
	    },
		tapiz: function()
		{			  				
			formlogin = new Form({
					id: "formulariologin",
					encType: "multipart/form-data",
					action: "",
					method: "POST"
			}, dojo.doc.createElement('div'));
			document.body.appendChild(formlogin.domNode);
			
			enombre = new ValidationTextBox({
		        type:"text",
		        name:"enombre",
		        id:"enombre",
		        required:true,
		        uppercase:true,
		        invalidMessage: i18n.invalidMessageName,
	           missingMessage: i18n.missingMessageName		        
		   }, dojo.doc.createElement('input'));
		   formlogin.domNode.appendChild(dojo.doc.createTextNode(i18n.lusr));
		   formlogin.domNode.appendChild(dojo.doc.createElement("br"));
		   formlogin.domNode.appendChild(enombre.domNode);
		   formlogin.domNode.appendChild(dojo.doc.createElement("p"));
		   //Eventos enombre
		   enombre.on("KeyUp", function(evt)
			{
				if(evt.keyCode==13)
       		{
       			eclave.focus();
       		}
			}, true);
			
		   eclave = new ValidationTextBox({
		        type:"password",
		        name:"eclave",
		        id:"eclave",
		        required:true,
		        uppercase:false,
		        invalidMessage: i18n.invalidMessageName,
	           missingMessage: i18n.missingMessageName
		   },dojo.doc.createElement('input'));
		   formlogin.domNode.appendChild(dojo.doc.createTextNode(i18n.lclave));
			formlogin.domNode.appendChild(dojo.doc.createElement("br"));
		   formlogin.domNode.appendChild(eclave.domNode);		   
		   formlogin.domNode.appendChild(dojo.doc.createElement("p"));
			//Eventos eclave
		   eclave.on("KeyUp", function(evt)
			{
				if(evt.keyCode==13)
       		{
       			benviar.focus();
       		}
			}, true);
					   		   
		   benviar = new Button({
				  type: "button",
				  id: "benviar",
		        label: i18n.lok
		   }, dojo.doc.createElement('input'));
		   formlogin.domNode.appendChild(benviar.domNode);
		   //Eventos benviar
		   benviar.on("KeyUp", function(evt)
			{
				if(evt.keyCode==13)
       		{
       			on.emit(benviar,"Click", {
    					bubbles: true,
    					cancelable: true
  					});
       		}
			}, true);
			benviar.on("Click", function(evt)
			{
       		standby.show();
		      padreLogin.vform();
		      standby.hide();       		
			}, true);
			
		   bcancelar = new Button({
				  type: "reset",
				  id: "bcancelar",
		        label: i18n.lcancel		        
		   }, dojo.doc.createElement('input'));
		   formlogin.domNode.appendChild(bcancelar.domNode);
		   domConstruct.create("a", { href: "/dsigloweb/app/index.html?es-es", title: "Castellano", innerHTML: " ES " }, formlogin.domNode);
		   domConstruct.create("a", { href: "/dsigloweb/app/index.html?en-us", title: "English", innerHTML: " EN " }, formlogin.domNode);
			formlogin.domNode.appendChild(dojo.doc.createElement("p"));
		   //Eventos bcancelar
		   bcancelar.on("Click", function(evt)
			{
				padreLogin.limpiar();
			}, true);
		   
		},
		dinfo:function () 
		{
			info = new ConfirmDialog({
	            // Dialog title
	            title: "Advertencia",
	        });
		},		
	   espera: function()
		{
			standby = new Standby({
				target: "formulariologin",
	          color: "#333",
	          opacity: 0 
	        });			
		   formlogin.domNode.appendChild(standby.domNode);
		},
		vform: function ()
		{
			if(formlogin.validate())
	      {
				padreLogin.xhr();						
	     	}
	     	else
	     	{
	     		info.set('content',i18n.errorform)
		      info.show();
	     	}
		},
		xhr: function () 
		{							
           	request.post("/sweb",{
           		preventCache: true,
					data : { 
	          		"c1" : enombre.get("value"),
						"c2" : eclave.get("value"),
						"c3" : "EAHTUTH"
	           	},
 					handleAs: "json"
 				}).then(function(datos)
 				{
 					if(datos.status == 'si') 
               {
              		dlogin.hide();
              		//Definimos cookies de sesion
              		var fecha = new Date();
              		//Tiempo de duracion de sesion
 						var minutos = 480;
 						fecha.setTime(fecha.getTime() + (minutos * 60 * 1000));
					   cookie("conectado", "si", { expires: fecha });
					   cookie("c1", enombre.get("value") , { expires: fecha });
						cookie("c2", eclave.get("value") , { expires: fecha });
						//Request post conseguir filtro
						request.post("/sweb",{
							data : { 
			          		"c1" : cookie("c1"),
								"c2" : cookie("c2"),
								"c3" : "selfiltrousuario"
			           	},
		 					handleAs: "json"
		 				}).then(function(datos)
		 				{
		 					/*console.log(datos.label);
			          	console.log(datos.identifier);
			          	console.log(datos.status);
							console.log(datos.items);*/
			            if (datos.status == 'si') 
			            {
			            	cookie("filtro", datos.filtro, { expires: fecha });       				  
							} 
							else 
							{
								//console.log(datos.status);
							}				
		 				},
		  				function(error)
		  				{
							console.log(error); 					
		 				});											   
					   var pesc = new Escritorio();
						pesc.inicio();					  
				   } 
				   else if(datos.status == 'no') 
				   {
				   	info.set('content',datos.message);
				   	info.show();
				  		padreLogin.limpiar();
				   }
				   else 
				   {
				   	padreLogin.limpiar();
				   } 						
 				},
  				function(error){
 					console.log("error:"+error);
					padreLogin.limpiar();
 				});					        	   	      
		},
		limpiar: function()
		{
			formlogin.reset();	
		},	
		dialoglogin: function () 
		{
			  dlogin = new Dialog({
	        content: formlogin,
	        title: i18n.ltitulo,
	        style: "width: 300px; height: 250px;",
			  closable: false
		    });
		},  	
		inicio: function () 
		{
				if( cookie("conectado")=="si" )
				{
					var pesc = new Escritorio();
					pesc.inicio();										
				}
				else 
				{			
					this.tapiz();					
					this.espera();
					standby.show();
					this.dialoglogin();
					this.dinfo();
					dlogin.show();
					standby.hide();
				}
		}
	});
});