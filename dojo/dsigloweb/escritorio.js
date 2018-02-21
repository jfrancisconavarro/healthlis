define(["dojo/_base/declare",
"dijit/layout/ContentPane",
"dijit/layout/BorderContainer",
"dojo",
"dijit/form/Button",
"dsigloweb/menu",
"dsigloweb/resultados/resultados",
"dsigloweb/peticiones/solicitudes",
"dsigloweb/monitor/monitor",
"dojo/on",
"dojo/domReady!"], function(declare,ContentPane,BorderContainer,dojo,Button,MiMenu,resultados,solicitudes,monitor,on)
{
	//var privateValue = 0;
	return declare(null, 
	{
		bc:null,
		cs:null,
		cc:null,
		padreEscritorio:null,
	   constructor: function(){
	      
	      padreEscritorio = this;	      
	    },
		tapiz: function()
		{	
			//Contenedor principal			
			cp = new BorderContainer({
	        id: "cpescritoriotapiz"
	    		}, document.getElementById("principal"));	   
		},
		menu: function () 
		{
			cs = new ContentPane({
	        region: "top",	        
	        id: "cpescritoriomenu"
			});
	    	cp.addChild(cs);
	    	//Eventos cs
		   cs.on("Show", function(evt)
			{
				var pmenu = new MiMenu();
				 pmenu.menu();
			}, true);
		},
		escritorio: function () 
		{
			cc = new ContentPane({
	        region: "center",	        
	        id: "cpescritorio"
			});
			
			bpeticiones = new Button({
				label: "Peticiones",
				id:"bescpet",
				type: "button",
				disabled:false
			});
			cc.addChild(bpeticiones);	
			//Eventos bpeticiones
		   bpeticiones.on("Click", function(evt)
			{
				padreEscritorio.destructor();
				var psol = new solicitudes();
            psol.inicio();
			}, true);    	
			
			bmonitor = new Button({
				label: "Monitor",
				id:"bescmon",
				type: "button",
				disabled:false
			});
			cc.addChild(bmonitor);	
			//Eventos bmonitor
		   bmonitor.on("Click", function(evt)
			{
				padreEscritorio.destructor();
            var pmon = new monitor();
            pmon.inicio();
			}, true);      				
	    		    	
	    	bresultados = new Button({
				label: "Resultados",
				id:"bescres",
				type: "button",
				disabled:false
			});
			cc.addChild(bresultados);	    	
	    	cp.addChild(cc);
	    	//Eventos bresultados
		   bresultados.on("Click", function(evt)
			{
				padreEscritorio.destructor();						        	                    
            var pres = new resultados();
	      	pres.inicio(); 
			}, true); 
		},
		destructor: function () 
		{
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
		},
		inicio: function()
		{
			if( dojo.cookie("conectado")=="si" )
			{
				this.tapiz();
				this.menu();
				this.escritorio();
				cs.startup();
				cc.startup();
		    	cp.startup();
		   }
			else 
			{					
				dojo.cookie("conectado", null, {expires: -1});
				dojo.cookie("c1", null, {expires: -1});
				dojo.cookie("c2", null, {expires: -1});		
				window.location.replace("/sigloweb/app");
			}			
		}
	});
});