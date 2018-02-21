define(["dojo/_base/declare",
"dijit/layout/ContentPane",
"dijit/Menu",
"dijit/MenuItem",
"dijit/MenuBarItem",
"dijit/form/Button",
"dijit/PopupMenuBarItem",
"dijit/MenuBar",
"dijit/DropDownMenu",
"dijit/registry",
"dojo/cookie",
"dojo/request",
"dojo/i18n!dsigloweb/nls/menu",
"dojox/widget/Standby",
"dsigloweb/resultados/resultados",
"dsigloweb/peticiones/solicitudes",
"dsigloweb/monitor/monitor",
"dsigloweb/configuracion/user",
"dsigloweb/configuracion/group",
"dojo/on",
"dojo/domReady!"], function(declare,ContentPane,Menu,MenuItem,MenuBarItem,Button,PopupMenuBarItem,MenuBar,DropDownMenu,registry,cookie,request,i18n,Standby,resultados,solicitudes,
monitor,user,group,on)
{
	//var privateValue = 0;
	return declare(null, 
	{
		menuprincipal:null,
		nodo:null,
		pSubMenu:null,
		padreMenu:null,
	   constructor: function(){
	      
	      padreMenu = this;	      
	    },
		menup: function()
		{			
			menuprincipal = new MenuBar({}, dojo.doc.createElement('div'));
			nodo= document.getElementById("cpescritoriomenu");
		   nodo.appendChild(menuprincipal.domNode);     	  
		},
		resultados: function () 
		{
			var mres = new MenuBarItem({ 
		   	label: i18n.lresultados,
		      id: "MenuResultados",
				disabled: false,
		      iconClass: "dijitIconApplication"		      
	      });
	      menuprincipal.addChild( mres );
	      //Eventos mres
		   mres.on("Click", function(evt)
			{
				padreMenu.destructor();                 
            var pres = new resultados();
	      	pres.inicio();  
			}, true);
		},
		solicitudes: function () 
		{
			var msol = new MenuBarItem({ 
		   	label: i18n.lpeticiones,
		      id: "MenuSolicitudes",
				disabled: false,
		      iconClass: "dijitIconApplication"		      
	      });
	      menuprincipal.addChild( msol );
	      //Eventos msol
		   msol.on("Click", function(evt)
			{
				padreMenu.destructor();                 
            var psol = new solicitudes();
      		psol.inicio(); 
			}, true);
		},
		monitor: function () 
		{
			var mmon = new MenuBarItem({ 
		   	label: i18n.lmonitor,
		      id: "MenuMonitor",
				disabled: false,
		      iconClass: "dijitIconApplication"
	      });
	      menuprincipal.addChild( mmon );
	      //Eventos mmon
		   mmon.on("Click", function(evt)
			{
				padreMenu.destructor();                 
            var pmon = new monitor();
	      	pmon.inicio();    
			}, true);
		},
		estadisticas: function () 
		{
			var mstd = new MenuBarItem({ 
		   	label: i18n.lestadisticas,
		      id: "MenuEstadisticas",
				disabled: false,
		      iconClass: "dijitIconApplication"
	      });
	      menuprincipal.addChild( mstd );
	      //Eventos mstd
		   mstd.on("Click", function(evt)
			{
				//padreMenu.destructor();                 
            //var pmon = new monitor();
	      	//pmon.inicio();    
			}, true);
		},
		configuracion: function () 
		{
			pSubMenu = new DropDownMenu({
				id: "MenuConf"	
			});

			var musr = new MenuItem({ 
		   	label: "Usuarios",
		      id: "MenuConfUsuarios",
		      disabled: false,
	         iconClass: "dijitIconUsers"
      	});
			pSubMenu.addChild( musr );
			//Eventos musr
		   musr.on("Click", function(evt)
			{
				padreMenu.destructor();                 
            var pconfusr = new user();
	      	pconfusr.inicio();	   
			}, true);
      	
			var mgrp = new MenuItem({ 
		   	label: "Grupos",
		      id: "MenuConfGrupos",
		      disabled: false,
	         iconClass: "dijitIconPackage"
      	});      	
      	pSubMenu.addChild( mgrp );	
      	//Eventos mgrp
		   mgrp.on("Click", function(evt)
			{
				padreMenu.destructor();                 
            var pconfgrp = new group();
	      	pconfgrp.inicio();	   
			}, true);	
	      
	      var mconf = new PopupMenuBarItem({ 
		   	label: i18n.lconfiguracion, 
		      id: "MenuConfiguracion",
		      disabled: false,
		      iconClass: "dijitIconFunction",
		      popup: pSubMenu 
		   });
	      menuprincipal.addChild( mconf );
		},					
		salir: function () 
		{
			var msalir = new MenuBarItem({ 
		   	label: i18n.lsalir,
		      id: "MenuSalir",
				disabled: false,
		      iconClass: "dijitIconApplication"		      
	      });
	      menuprincipal.addChild( msalir );
	      //Eventos msalir
		   msalir.on("Click", function(evt)
			{
				dojo.cookie("conectado", null, {expires: -1});
	      	dojo.cookie("c1", null, {expires: -1});
	      	dojo.cookie("c2", null, {expires: -1});		
	      	window.location.replace("/sigloweb/app");	  
			}, true);	
		},	
		seguridad: function () 
		{			
			request.post("/sweb",{
					data : { 
	          		"c1" : cookie("c1"),
						"c2" : cookie("c2"),
						"c3" : "selsec"
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
	            	//console.log(datos.items);  
		            dojo.forEach(datos.items,function(item)
		            {
			          	//console.log(item.etiqueta);
			            dijit.byId(item.etiqueta).set(item.propiedad,item.valor); 
		         	});              				  
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
		},
		espera: function()
		{
			standby = new Standby({
				target: dojo.body(),
	          color: "#333",
	          opacity: 0 
	        });			
		   document.body.appendChild(standby.domNode);
		   standby.startup();
		},		
		menu: function () 
		{
			if( dojo.cookie("conectado")=="si" )
			{
				this.espera();
				standby.show();
				this.menup();
				this.solicitudes();
				this.monitor();				
				this.resultados();
				this.estadisticas();
				this.configuracion();														
				this.salir();				
				menuprincipal.startup();
				this.seguridad();
				standby.hide();
			}
			else 
			{					
				dojo.cookie("conectado", null, {expires: -1});
				dojo.cookie("c1", null, {expires: -1});
	      	dojo.cookie("c2", null, {expires: -1});
	      	dojo.cookie("filtro", null , { expires: -1 });	
				window.location.replace("/sweb/app");
			}
		},
		destructor: function () 
		{						
         if(typeof dijit.registry.byId("rescont") != "undefined")
			{
               dijit.registry.byId("rescont").destroyRecursive();
         }
         if(typeof dijit.registry.byId("bescres") != "undefined")
			{
               dijit.registry.byId("bescres").destroyRecursive();
         }
         if(typeof dijit.registry.byId("bescmon") != "undefined")
			{
               dijit.registry.byId("bescmon").destroyRecursive();
         }
			if(typeof dijit.registry.byId("bescpet") != "undefined")
			{
               dijit.registry.byId("bescpet").destroyRecursive();
         }
         if(typeof dijit.registry.byId("contconfusr") != "undefined")
			{
               dijit.registry.byId("contconfusr").destroyRecursive();
         }
         if(typeof dijit.registry.byId("contconfgrp") != "undefined")
			{
               dijit.registry.byId("contconfgrp").destroyRecursive();
         } 
         if(typeof dijit.registry.byId("cpsol") != "undefined")
			{
               dijit.registry.byId("cpsol").destroyRecursive();  
         }  
         if(typeof dijit.registry.byId("cpmon") != "undefined")
			{
               dijit.registry.byId("cpmon").destroyRecursive();  
         }                           
		}		
	});
});