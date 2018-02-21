define(["dojo/_base/declare",
"dsigloweb/peticiones/util",
"dojo/on",
"dojo/domReady!"], function(declare,util,on){

return declare(null, {
		wutil:null,
		constructor: function () {
			wutil = new util();
		},
		vsid: function( )
		{
			if( sid.isValid() )
	  	  	{
	  	  		require(["dojo/request"], function(request)
	  	  		{
		          request.post("/sweb",{
	 					handleAs: "json",
	 					preventCache: true,
	 					data : {
			  	  			"c1": dojo.cookie("c1"),
			  	  			"c2": dojo.cookie("c2"),
			  	  			"c3" : "sid",
			  	  			"esid" : sid.get("value"),
			  	  			"efecha" : fecha.get("displayedValue")
			  	  		}
	 				}).then(function(datos){
	 					if (datos.status == 'si') 
		            {  
		            	dialogo.set('content',datos.message)
				         dialogo.show();
						  	sid.set("value","",false);
						  	fecha.set('displayedValue',wutil.hoy(),false);								  
						} 
	 				},
	  				function(error)
	  				{
	 						dialogo.set('content',error.message)
				         dialogo.show();	
						  	sid.set("value","",false);
	 				});				
				});
			}
		},
		cpacientes: function( )
		{
			require(
				[
				"dojo",
	 			"dojo/data/ItemFileReadStore",
	 			"dojo/request"
	 			], function(dojo,ItemFileReadStore,request)
	  	  		{
		          request.post("/sweb",{
	 					handleAs: "json",
	 					preventCache: true,
	 					data : { 
	 					 "c1" : dojo.cookie("c1"),
	 					 "c2" : dojo.cookie("c2"),
	 					 "c3" : "pacientes"
		          }
	 				}).then(function(datos){
	 					pacientesStore = new ItemFileReadStore({data: datos});
						/*if( ape1.get('store')=='' ) { ape1.store.close(); }
					   ape1.set('store',ape1Store);
					   ape1._lastScrollTop=ape1.scrollTop;*/
	 				},
	  				function(error)
	  				{
	 						console.log("Error ape1:"+error);
	 				});				
			});
		},
		cnombre: function () 
		{
			var values = [];
			pacientesStore.fetch({
	         query: {ape1 : ape1.get('value'), ape2 : ape2.get('value') },
	         onComplete: function(items){      	
	          dojo.forEach(items,function(item)
	          {          	 
	             values.push({id:item.id,nombre:item.nombre});                
	          });
				
	          var dataItems = {
	               identifier: 'id',
	               label: 'nombre',
	               items: values
	  				};
					require(
					[
					"dojo",
		 			"dojo/data/ItemFileReadStore",
		 			], function(dojo,ItemFileReadStore)
		  	  		{
		  			   nombreStore = new ItemFileReadStore({data: dataItems});
						if( nombre.get('store')=='' ) { nombre.store.close(); }
					   nombre.set('store',nombreStore);
					   nombre._lastScrollTop=nombre.scrollTop;  
					});                                 	
	         }			    
		   });
		},
		vnombre: function () 
		{
			pacientesStore.fetch({
	         query: {ape1 : ape1.get('value'), ape2 : ape2.get('value'), nombre: nombre.get('value') },
	         onComplete: function(items){      	
	          dojo.forEach(items,function(item)
	          {          	 
	                pid.set('value',item.pid,true);            
	          });                            	
	         }			    
		   });
		},
		vsexo: function( )
		{
			if( sexo.get("value")==" " || sexo.get("value")=="" || sexo.get("value")==null )
	  		{
	     		//console.log("1");
	  		}
	  		else if( !isNaN(parseFloat(sexo.get("value"))) && isFinite(sexo.get("value")) )
	  		{
	  			//console.log("2");
	  			//Traduzco númerico a sexo
				sexoStore.fetch({
		         query: {id : sexo.get('value') },
		         onComplete: function(items){
		          if( items.length>0 )
		          {
	                dojo.forEach(items,function(item){
	                     //console.log(item.name);
	                     sexo.set('value',item.name);
	                });
	             }             
		         }			    
			   }); 
	  		}
	  		else 
	  		{
				//console.log("3");
	  			//Traduzco numerico a sexo
				sexoStore.fetch({
		         query: {name : sexo.get('value') },
		         onComplete: function(items){
		          if( items.length>0 )
		          {
	                dojo.forEach(items,function(item){
	                     //console.log(item.name);
	                     sexo.set('value',item.name);
	                });
	             }
	             else
	             {
	             	
	             }
		         }			    
			   });
	  		}
		},
		csexo: function( )
		{
			require(
				[
				"dojo",
	 			"dojo/data/ItemFileReadStore",
	 			"dojo/request"
	 			], function(dojo,ItemFileReadStore,request)
	  	  		{
		          request.post("/sweb",{
	 					handleAs: "json",
	 					preventCache: true,
	 					data : { 
	 					 "c1" : dojo.cookie("c1"),
	 					 "c2" : dojo.cookie("c2"),
	 					 "c3" : "sexo"
		          }
	 				}).then(function(datos){
	 					sexoStore = new ItemFileReadStore({data: datos});
						if( sexo.get('store')=='' ) { sexo.store.close(); }
					   sexo.set('store',sexoStore);
					   sexo._lastScrollTop=sexo.scrollTop;
	 				},
	  				function(error)
	  				{
	 						console.log("Error sexo:"+error);
	 				});				
			});
		},
		vdemo2: function()
		{
			var demo2Store=demo2.get('store');
	 		if( demo2.get("value")==" " || demo2.get("value")=="" || demo2.get("value")==null )
	  		{
	     		//console.log("1");
	  		}
	  		else if( !isNaN(parseFloat(demo2.get("value"))) && isFinite(demo2.get("value")) )
	  		{
	  			//Traduzco numero a demo
				demo2Store.fetch({
		         query: {codigo : demo2.get('value') },
		         onComplete: function(items){
		          if( items.length>0 )
		          {
	                dojo.forEach(items,function(item){
	                     //console.log(item.name);
	                     demo2.set('value',item.descripcion);
	                });
	             }
	             else
	             {
	             	
	             }
		         }			    
			   }); 
	  		}
	  		else 
	  		{
	  			//Traduzco descripcion a demo
				demo2Store.fetch({
		         query: {descripcion : demo2.get('value') },
		         onComplete: function(items){
		          if( items.length>0 )
		          {
	                dojo.forEach(items,function(item){
	                     //console.log(item.name);
	                     demo2.set('value',item.descripcion);
	                });
	             }
	             else
	             {
	             	
	             }
		         }			    
			   });
	  		}
		},
		cdemo2: function( )
		{
			require(
				[
				"dojo",
	 			"dojo/data/ItemFileReadStore",
	 			"dojo/request"
	 			], function(dojo,ItemFileReadStore,request)
	  	  		{
	  	  			var store = null;
		          request.post("/sweb",{
	 					handleAs: "json",
	 					preventCache: true,
	 					data : { 
	 					 "c1" : dojo.cookie("c1"),
	 					 "c2" : dojo.cookie("c2"),
	 					 "c3" : "demo",
	 					 "demo" : "2" 					 
		          }
	 				}).then(function(datos){
	 					store = new ItemFileReadStore({data: datos});
						if( demo2.get('store')=='' ) { demo2.store.close(); }
					   demo2.set('store',store);
					   demo2._lastScrollTop=sexo.scrollTop;
	 				},
	  				function(error)
	  				{
	 						console.log("Error demo2:"+error);
	 				});				
			});
		},
		vdemo1: function( dato, p2 )
		{
			if( dato.posicion[0] == 1 )
	    	{		            
	    		dojo.query("label[for=f1]")[0].innerHTML = dato.campo[0];				                		
	    		if( dato.campo[0]=='No Introducir')
	    		{
	    			f1.set('disabled',true);
	   			//f1.set('value',dato.campo[0],false);
	    		}
	    		else if( dato.campo[0]=='Fecha Prescripción' || dato.campo[0]=='Fecha Prescripcion' )
	    		{
	    			f1.set('disabled',false);
	    			f1.set('value', wutil.hoy(),false);
	    		}
	    		else if( dato.campo[0]=='Operación')
	    		{
	    			if (p2.match(/.*ADESLAS*./))
	    			{
	    				f1.set('disabled',false);
	    				f1.set('value', '0000000',false);
	    			}
	    			else
	    			{
						f1.set('disabled',false);
		      		if( typeof dato.obligatorio != 'undefined')
		      		{
		      			if( dato.obligatorio[0]=='S' )
		         		{
		         			f1.set("regExpGen",wutil.ltarjetas(dato.tipo[0],dato.longitud[0]));
		         			f1.set("invalidMessage","Valor de "+dato.campo[0]+" incorrecto");
		         		}
		         	}
		         	if( typeof dato.tipo != 'undefined' && typeof dato.longitud != 'undefined' )
		      		{
		         		padreSolicitudes.settipof(1,dato.tipo[0],dato.longitud[0]);
		         	}    			
	    			}
	    		}
	    		else
	    		{
	    			if (p2.match(/.*GENERALI*./))    		
	    			{
	    				f1.set('disabled',false);
	    			}
	    			else
	    			{
		      		f1.set('disabled',false);
		      		if( typeof dato.obligatorio != 'undefined')
		      		{
		      			if( dato.obligatorio[0]=='S' )
		         		{
		         			f1.set("regExpGen",wutil.ltarjetas(dato.tipo[0],dato.longitud[0]));
		         			f1.set("invalidMessage","Valor de "+dato.campo[0]+" incorrecto");
		         		}
		         	}
		         	if( typeof dato.tipo != 'undefined' && typeof dato.longitud != 'undefined' )
		      		{
		         		padreSolicitudes.settipof(1,dato.tipo[0],dato.longitud[0]);
		         	}		
		         }			               				  
	      	}             		
	    	}
	    	else if( dato.posicion[0] == 2 )
	    	{
	    		dojo.query("label[for=f2]")[0].innerHTML = dato.campo[0];
	    		if( dato.campo[0]=='-')
	    		{
	    			f2.set('disabled',true);
	   			//f2.set('value',dato.campo[0],false);
	    		}
	    		else if( dato.campo[0]=='Fecha Prescripción' || dato.campo[0]=='Fecha Prescripcion' )
	    		{
	    			f2.set('disabled',false);
	    			f2.set('value', wutil.hoy(),false);
	    		}
	    		else if( dato.campo[0]=='Operación')
	    		{
	    			if (p2.match(/.*ADESLAS*./))
	    			{
	    				f2.set('disabled',false);
	    				f2.set('value', '0000000',false);
	    			}
	    			else
		    		{
		   			f2.set('disabled',false);
		   			if( typeof dato.obligatorio != 'undefined')
		      		{
		      			
		      			if( dato.obligatorio[0]=='S' )
		         		{
		         			f2.set("regExpGen",wutil.ltarjetas(dato.tipo[0],dato.longitud[0]));
		         			f2.set("invalidMessage","Valor de "+dato.campo[0]+" incorrecto");
		         		}
		         	}
		         	if( typeof dato.tipo != 'undefined' && typeof dato.longitud != 'undefined' )
		      		{
		         		padreSolicitudes.settipof(2,dato.tipo[0],dato.longitud[0]);
		         	}	
		   		}
	    		}
	    		else
	    		{
	   			f2.set('disabled',false);
	   			if( typeof dato.obligatorio != 'undefined')
	      		{
	      			
	      			if( dato.obligatorio[0]=='S' )
	         		{
	         			f2.set("regExpGen",wutil.ltarjetas(dato.tipo[0],dato.longitud[0]));
	         			f2.set("invalidMessage","Valor de "+dato.campo[0]+" incorrecto");
	         		}
	         	}
	         	if( typeof dato.tipo != 'undefined' && typeof dato.longitud != 'undefined' )
	      		{
	         		padreSolicitudes.settipof(2,dato.tipo[0],dato.longitud[0]);
	         	}	
	   		}											
	    	}
	    	else if( dato.posicion[0] == 3 )
	    	{
	    		dojo.query("label[for=f3]")[0].innerHTML = dato.campo[0];
	    		if( dato.campo[0]=='-')
	    		{
	    			f3.set('disabled',true);
	   			//f3.set('value',dato.campo[0],false);
	    		}
	    		else if( dato.campo[0]=='Fecha Prescripción' || dato.campo[0]=='Fecha Prescripcion' )
	    		{
	    			f3.set('disabled',false);
	    			f3.set('value', wutil.hoy(),false);
	    		}
	    		else if( dato.campo[0]=='Operación')
	    		{
	    			if (p2.match(/.*ADESLAS*./))
	    			{
	    				f3.set('disabled',false);
	    				f3.set('value', '0000000',false);
	    			}
	    			else
	    			{
	    				f3.set('disabled',false);
		      		if( typeof dato.obligatorio != 'undefined')
		      		{
							if( dato.obligatorio[0]=='S' )
		         		{
		         			f3.set("regExpGen",wutil.ltarjetas(dato.tipo[0],dato.longitud[0]));
		         			f3.set("invalidMessage","Valor de "+dato.campo[0]+" incorrecto");
		         		}
		         	}
		         	if( typeof dato.tipo != 'undefined' && typeof dato.longitud != 'undefined' )
		      		{
		         		padreSolicitudes.settipof(3,dato.tipo[0],dato.longitud[0]);
		         	}	
	    			}
	    		}
	    		else
	    		{
	      		f3.set('disabled',false);
	      		if( typeof dato.obligatorio != 'undefined')
	      		{
						if( dato.obligatorio[0]=='S' )
	         		{
	         			f3.set("regExpGen",wutil.ltarjetas(dato.tipo[0],dato.longitud[0]));
	         			f3.set("invalidMessage","Valor de "+dato.campo[0]+" incorrecto");
	         		}
	         	}
	         	if( typeof dato.tipo != 'undefined' && typeof dato.longitud != 'undefined' )
	      		{
	         		padreSolicitudes.settipof(3,dato.tipo[0],dato.longitud[0]);
	         	}	
				}				               		
	    	}
			else if( dato.posicion[0] == 4 )
	    	{
	    		dojo.query("label[for=f4]")[0].innerHTML = dato.campo[0];
	    		if( dato.campo[0]=='-')
	    		{
	    			f4.set('disabled',true);
	   			//f4.set('value',dato.campo[0],false);
	    		}
	    		else if( dato.campo[0]=='Fecha Prescripción' || dato.campo[0]=='Fecha Prescripcion' )
	    		{
	    			f4.set('disabled',false);
	    			f4.set('value', wutil.hoy(), false);    			
	    		}
	    		else if( dato.campo[0]=='Operación')
	    		{
	    			if (p2.match(/.*ADESLAS*./))
	    			{
	    				f4.set('disabled',false);
	    				f4.set('value', '0000000',false);
	    			}
	    			else
		    		{
		      		f4.set('disabled',false);
		      		if( typeof dato.obligatorio != 'undefined')
		      		{
		         		if( dato.obligatorio[0]=='S' )
		         		{
		         			f4.set("regExpGen",wutil.ltarjetas(dato.tipo[0],dato.longitud[0]));
		         			f4.set("invalidMessage","Valor de "+dato.campo[0]+" incorrecto");
		         		}
		         	}
		         	if( typeof dato.tipo != 'undefined' && typeof dato.longitud != 'undefined' )
		      		{
		         		padreSolicitudes.settipof(4,dato.tipo[0],dato.longitud[0]);
		         	}	
		      	}	
	    		}
	    		else
	    		{
	      		f4.set('disabled',false);
	      		if( typeof dato.obligatorio != 'undefined')
	      		{
	         		if( dato.obligatorio[0]=='S' )
	         		{
	         			f4.set("regExpGen",wutil.ltarjetas(dato.tipo[0],dato.longitud[0]));
	         			f4.set("invalidMessage","Valor de "+dato.campo[0]+" incorrecto");
	         		}
	         	}
	         	if( typeof dato.tipo != 'undefined' && typeof dato.longitud != 'undefined' )
	      		{
	         		padreSolicitudes.settipof(4,dato.tipo[0],dato.longitud[0]);
	         	}	
	      	}		
	    	}
	    	else if( dato.posicion[0] == 5 )
	    	{
	    		dojo.query("label[for=f5]")[0].innerHTML = dato.campo[0];
				if( dato.campo[0]=='-')
	    		{
	    			f5.set('disabled',true);
	   			//f5.set('value',dato.campo[0],false);
	    		}
				else if( dato.campo[0]=='Fecha Prescripción' || dato.campo[0]=='Fecha Prescripcion' )
	    		{
	    			f5.set('disabled',false);
	    			f5.set('value', wutil.hoy(),false);    			
	    		}
	    		else if( dato.campo[0]=='Operación')
	    		{
	    			if (p2.match(/.*ADESLAS*./))
	    			{
	    				f5.set('disabled',false);
	    				f5.set('value', '0000000',false);
	    			}
	    			else
		    		{
		      		f5.set('disabled',false);
		      		if( typeof dato.obligatorio != 'undefined')
		      		{
		      			if( dato.obligatorio[0]=='S' )
		      			{
		      				f5.set("regExpGen",wutil.ltarjetas(dato.tipo[0],dato.longitud[0]));
		      				f5.set("invalidMessage","Valor de "+dato.campo[0]+" incorrecto");
		      			}
		      		}
		         	if( typeof dato.tipo != 'undefined' && typeof dato.longitud != 'undefined' )
		      		{
		         		padreSolicitudes.settipof(5,dato.tipo[0],dato.longitud[0]);
		         	}	
		      	}
	    		}
	    		else
	    		{
	      		f5.set('disabled',false);
	      		if( typeof dato.obligatorio != 'undefined')
	      		{
	      			if( dato.obligatorio[0]=='S' )
	      			{
	      				f5.set("regExpGen",wutil.ltarjetas(dato.tipo[0],dato.longitud[0]));
	      				f5.set("invalidMessage","Valor de "+dato.campo[0]+" incorrecto");
	      			}
	      		}
	         	if( typeof dato.tipo != 'undefined' && typeof dato.longitud != 'undefined' )
	      		{
	         		padreSolicitudes.settipof(5,dato.tipo[0],dato.longitud[0]);
	         	}	
	      	}
	    	}
	    	else if( dato.posicion[0] == 6 )
	    	{
	    		dojo.query("label[for=f6]")[0].innerHTML = dato.campo[0];
				if( dato.campo[0]=='-')
	    		{
	    			f6.set('disabled',true);
	   			//f6.set('value',dato.campo[0],false);
	    		}
				else if( dato.campo[0]=='Fecha Prescripción' || dato.campo[0]=='Fecha Prescripcion' )
	    		{
	    			f6.set('disabled',false);
	    			f6.set('value', wutil.hoy(),false);
	    		}
	    		else if( dato.campo[0]=='Operación')
	    		{
	    			if (p2.match(/.*ADESLAS*./))
	    			{
	    				f6.set('disabled',false);
	    				f6.set('value', '0000000',false);
	    			}
	    			else
		    		{
		      		f6.set('disabled',false);
		      		if( typeof dato.obligatorio != 'undefined')
		      		{
		      			if( dato.obligatorio[0]=='S' )
		      			{
		      				f6.set("regExpGen",wutil.ltarjetas(dato.tipo[0],dato.longitud[0]));
		      				f6.set("invalidMessage","Valor de "+dato.campo[0]+" incorrecto");
		      			}
		      		}
		         	if( typeof dato.tipo != 'undefined' && typeof dato.longitud != 'undefined' )
		      		{
		         		padreSolicitudes.settipof(6,dato.tipo[0],dato.longitud[0]);
		         	}	
		      	}
	    		}
	    		else
	    		{
	      		f6.set('disabled',false);
	      		if( typeof dato.obligatorio != 'undefined')
	      		{
	      			if( dato.obligatorio[0]=='S' )
	      			{
	      				f6.set("regExpGen",wutil.ltarjetas(dato.tipo[0],dato.longitud[0]));
	      				f6.set("invalidMessage","Valor de "+dato.campo[0]+" incorrecto");
	      			}
	      		}
	         	if( typeof dato.tipo != 'undefined' && typeof dato.longitud != 'undefined' )
	      		{
	         		padreSolicitudes.settipof(6,dato.tipo[0],dato.longitud[0]);
	         	}	
	      	}
	    	}
	    	else if( dato.posicion[0] == 7 )
	    	{
	    		dojo.query("label[for=f7]")[0].innerHTML = dato.campo[0];
				if( dato.campo[0]=='-')
	    		{
	    			f7.set('disabled',true);
	   			//f7.set('value',dato.campo[0],false);
	    		}
				else if( dato.campo[0]=='Fecha Prescripción' || dato.campo[0]=='Fecha Prescripcion' )
	    		{
	    			f7.set('disabled',false);
	    			f7.set('value', wutil.hoy(),false);
	    		}
	    		else if( dato.campo[0]=='Operación')
	    		{
	    			if (p2.match(/.*ADESLAS*./))
	    			{
	    				f7.set('disabled',false);
	    				f7.set('value', '0000000',false);
	    			}
	    			else
		    		{
		      		f7.set('disabled',false);
		      		if( typeof dato.obligatorio != 'undefined')
		      		{
		         		if( dato.obligatorio[0]=='S' )
		         		{
		         			f7.set("regExpGen",wutil.ltarjetas(dato.tipo[0],dato.longitud[0]));
		         			f7.set("invalidMessage","Valor de "+dato.campo[0]+" incorrecto");
		         		}
		         	}
		         	if( typeof dato.tipo != 'undefined' && typeof dato.longitud != 'undefined' )
		      		{
		         		padreSolicitudes.settipof(7,dato.tipo[0],dato.longitud[0]);
		         	}	
		      	}
	    		}
	    		else
	    		{
	      		f7.set('disabled',false);
	      		if( typeof dato.obligatorio != 'undefined')
	      		{
	         		if( dato.obligatorio[0]=='S' )
	         		{
	         			f7.set("regExpGen",wutil.ltarjetas(dato.tipo[0],dato.longitud[0]));
	         			f7.set("invalidMessage","Valor de "+dato.campo[0]+" incorrecto");
	         		}
	         	}
	         	if( typeof dato.tipo != 'undefined' && typeof dato.longitud != 'undefined' )
	      		{
	         		padreSolicitudes.settipof(7,dato.tipo[0],dato.longitud[0]);
	         	}	
	      	}
	    	}
	    	else if( dato.posicion[0] == 8 )
	    	{
	    		dojo.query("label[for=f8]")[0].innerHTML = dato.campo[0];
				if( dato.campo[0]=='-')
	    		{
	    			f8.set('disabled',true);
	   			//f8.set('value',dato.campo[0],false);
	    		}
				else if( dato.campo[0]=='Fecha Prescripción' || dato.campo[0]=='Fecha Prescripcion' )
	    		{
	    			f8.set('disabled',false);
	    			f8.set('value', wutil.hoy(),false);
	    		}
	    		else if( dato.campo[0]=='Operación')
	    		{
	    			if (p2.match(/.*ADESLAS*./))
	    			{
	    				f8.set('disabled',false);
	    				f8.set('value', '0000000',false);
	    			}
					else
		    		{
		      		f8.set('disabled',false);
						if( typeof dato.obligatorio != 'undefined')
		      		{
		      			if( dato.obligatorio[0]=='S' )
		      			{
		      				f8.set("regExpGen",wutil.ltarjetas(dato.tipo[0],dato.longitud[0]));
		      				f8.set("invalidMessage","Valor de "+dato.campo[0]+" incorrecto");
		      			}
		      		}
		         	if( typeof dato.tipo != 'undefined' && typeof dato.longitud != 'undefined' )
		      		{
		         		padreSolicitudes.settipof(8,dato.tipo[0],dato.longitud[0]);
		         	}	
		      	}
	    		}
	    		else
	    		{
	      		f8.set('disabled',false);
					if( typeof dato.obligatorio != 'undefined')
	      		{
	      			if( dato.obligatorio[0]=='S' )
	      			{
	      				f8.set("regExpGen",wutil.ltarjetas(dato.tipo[0],dato.longitud[0]));
	      				f8.set("invalidMessage","Valor de "+dato.campo[0]+" incorrecto");
	      			}
	      		}
	         	if( typeof dato.tipo != 'undefined' && typeof dato.longitud != 'undefined' )
	      		{
	         		padreSolicitudes.settipof(8,dato.tipo[0],dato.longitud[0]);
	         	}	
	      	}
	    	}
		},
		cdemo1: function( )
		{
			require(
				[
				"dojo",
	 			"dojo/data/ItemFileReadStore",
	 			"dojo/request"
	 			], function(dojo,ItemFileReadStore,request)
	  	  		{
					 standby.show();
		          request.post("/sweb",{
	 					handleAs: "json",
	 					preventCache: true,
	 					data : { 
	 					 "c1" : dojo.cookie("c1"),
	 					 "c2" : dojo.cookie("c2"),
	 					 "c3" : "demo",
	 					 "demo" : "1" 					 
		          }
	 				}).then(function(datos){
	 					demo1Store = new ItemFileReadStore({data: datos});
						if( demo1.get('store')=='' ) { demo1.store.close(); }
					   demo1.set('store',demo1Store);
					   demo1._lastScrollTop=demo1.scrollTop;
					   standby.hide();
	 				},
	  				function(error)
	  				{
	 						console.log("Error demo1:"+error);
	 						standby.hide();
	 				});
	 				
	 				request.post("/sweb",{
	 					handleAs: "json",
	 					preventCache: true,
	 					data : { 
	 					 "c1" : dojo.cookie("c1"),
	 					 "c2" : dojo.cookie("c2"),
	 					 "c3" : "seldiscos"					 
		          }
	 				}).then(function(datos){
	 					tarjetasStore = new ItemFileReadStore({data: datos});
	 				},
	  				function(error)
	  				{
	 						console.log("Error tarjetas:"+error);
	 				});				
			});
		},
		cdemostop: function( )
		{
			require(
				[
				"dojo",
	 			"dojo/data/ItemFileReadStore",
	 			"dojo/request"
	 			], function(dojo,ItemFileReadStore,request)
	  	  		{
	  	  			standby.show();
		          request.post("/sweb",{
	 					handleAs: "json",
	 					preventCache: true,
	 					data : { 
	 					 "c1" : dojo.cookie("c1"),
	 					 "c2" : dojo.cookie("c2"),
	 					 "c3" : "demostop"			 
		          }
	 				}).then(function(datos){
	 					//console.log(datos);
	 					demostopStore = new ItemFileReadStore({data: datos});	
	 					standby.hide();				
	 				},
	  				function(error)
	  				{
	 						console.log("Error demo1:"+error);
	 						standby.hide();
	 				});
			});
		},
		pvdemo1: function()
		{
			if( demo1.get("value")==" " || demo1.get("value")=="" || demo1.get("value")==null )
	  		{     		
	     		padreSolicitudes.limtipof();
	  		}
	  		else if( !isNaN(parseFloat(demo1.get("value"))) && isFinite(demo1.get("value")) )
	  		{		
	  			padreSolicitudes.limtipof();
	  			
				demo1Store.fetch({
		         query: {codigo : demo1.get('value') },
		         onComplete: function(items){
		          if( items.length>0 )
		          {
	                dojo.forEach(items,function(item){
	                     
	                     demo1.set('value',item.descripcion,false);
	                     tarjetasStore.fetch({
					         query: { disco : item.disco[0] },
					         onComplete: function(items2){
			                dojo.forEach(items2,function(item2){
			                	//console.log("Numero:"+item2.posicion[0]+"-"+item2.tipo[0]+"-"+item2.longitud[0]+"-");				            			           	      
			                	wdemo.vdemo1( item2 );
			                });
					         }
						   });  
	                });
	             }
	             else
	             {
	             	
	             }
		         }			    
			   });    			      		
	  		}
	  		else
	  		{
	  			padreSolicitudes.limtipof();
				
	    		demo1Store.fetch({
		         query: {descripcion : demo1.get('value') },
		         onComplete: function(items){
	             dojo.forEach(items,function(item)
	             {
	                  tarjetasStore.fetch({
					         query: { disco : item.disco[0] },
					         onComplete: function(items2){
			                dojo.forEach(items2,function(item2){	
			                //console.log("Letra:"+item2.posicion[0]+"-"+item2.tipo[0]+"-"+item2.longitud[0]+"-");		            					           	      
			                	wdemo.vdemo1( item2 );
			                });
					         }
						   });                     
	             });
		         }
			   });             		
	  		}	
		},
		cdemo9: function( )
		{
			require(
				[
				"dojo",
	 			"dojo/data/ItemFileReadStore",
	 			"dojo/request"
	 			], function(dojo,ItemFileReadStore,request)
	  	  		{
					standby.show();
		          request.post("/sweb",{
	 					handleAs: "json",
	 					preventCache: true,
	 					data : { 
	 					 "c1" : dojo.cookie("c1"),
	 					 "c2" : dojo.cookie("c2"),
	 					 "c3" : "demo",
	 					 "demo" : "9" 					 
		          }
	 				}).then(function(datos){
	 					demo9Store = new ItemFileReadStore({data: datos});
						if( demo9.get('store')=='' ) { demo9.store.close(); }
					   demo9.set('store',demo9Store);
					   demo9._lastScrollTop=demo9.scrollTop;
					   standby.hide();
	 				},
	  				function(error)
	  				{
	 						console.log("Error demo9:"+error);
	 						standby.hide();
	 				});				
			});
		},
		vdemo9: function( )
		{
			if( demo9.get("value")==" " || demo9.get("value")=="" || demo9.get("value")==null )
	  		{
	     		//console.log("1");
	  		}
	  		else if( !isNaN(parseFloat(demo9.get("value"))) && isFinite(demo9.get("value")) )
	  		{
	  			//Traduzco opcional a Prueba
				demo9Store.fetch({
		         query: {codigo : demo9.get('value') },
		         onComplete: function(items){
		          if( items.length>0 )
		          {
	                dojo.forEach(items,function(item){
	                     //console.log(item.name);
	                     demo9.set('value',item.descripcion);
	                });
	             }
	             else
	             {
	             	
	             }
		         }			    
			   }); 
	  		}
	  		else 
	  		{
	  			//Traduzco opcional a Prueba
				demo9Store.fetch({
		         query: {descripcion : demo9.get('value') },
		         onComplete: function(items){
		          if( items.length>0 )
		          {
	                dojo.forEach(items,function(item){
	                     //console.log(item.name);
	                     demo9.set('value',item.descripcion);
	                });
	             }
	             else
	             {
	             	
	             }
		         }			    
			   });
	  		}
		},
		vdemo3:function ()
		{
			if( demo3.get("value")==" " || demo3.get("value")=="" || demo3.get("value")==null )
	  		{
	     		//console.log("1");
	  		}
	  		else if( !isNaN(parseFloat(demo3.get("value"))) && isFinite(demo3.get("value")) )
	  		{
	  			//Traduzco opcional a Prueba
				demo3Store.fetch({
		         query: {codigo : demo3.get('value') },
		         onComplete: function(items){
		          if( items.length>0 )
		          {
	                dojo.forEach(items,function(item){
	                     //console.log(item.name);
	                     demo3.set('value',item.descripcion);
	                });
	             }
	             else
	             {
	             	
	             }
		         }			    
			   }); 
	  		}
	  		else 
	  		{
	  			//Traduzco opcional a Prueba
				demo3Store.fetch({
		         query: {descripcion : demo3.get('value') },
		         onComplete: function(items){
		          if( items.length>0 )
		          {
	                dojo.forEach(items,function(item){
	                     //console.log(item.name);
	                     demo3.set('value',item.descripcion);
	                });
	             }
	             else
	             {
	             	
	             }
		         }			    
			   });
	  		}	
		},
		cdemo3:function ()
		{
			require(
				[
				"dojo",
	 			"dojo/data/ItemFileReadStore",
	 			"dojo/request"
	 			], function(dojo,ItemFileReadStore,request)
	  	  		{
					standby.show();
		          request.post("/sweb",{
	 					handleAs: "json",
	 					preventCache: true,
	 					data : { 
	 					 "c1" : dojo.cookie("c1"),
	 					 "c2" : dojo.cookie("c2"),
	 					 "c3" : "demo",
	 					 "demo" : "3" 					 
		          }
	 				}).then(function(datos){
	 					demo3Store = new ItemFileReadStore({data: datos});
						if( demo3.get('store')=='' ) { demo3.store.close(); }
					   demo3.set('store',demo3Store);
					   demo3._lastScrollTop=demo3.scrollTop;
					   standby.hide();
	 				},
	  				function(error)
	  				{
	 						console.log("Error demo3:"+error);
	 						standby.hide();
	 				});				
			});
		},
		vdemo5:function ()
		{
			if( demo5.get("value")==" " || demo5.get("value")=="" || demo5.get("value")==null )
	  		{
	     		//console.log("1");
	  		}
	  		else if( !isNaN(parseFloat(demo5.get("value"))) && isFinite(demo5.get("value")) )
	  		{
	  			//Traduzco opcional a Prueba
				demo5Store.fetch({
		         query: {codigo : demo5.get('value') },
		         onComplete: function(items){
		          if( items.length>0 )
		          {
	                dojo.forEach(items,function(item){
	                     //console.log(item.name);
	                     demo5.set('value',item.descripcion);
	                });
	             }
	             else
	             {
	             	
	             }
		         }			    
			   }); 
	  		}
	  		else 
	  		{
	  			//Traduzco opcional a Prueba
				demo5Store.fetch({
		         query: {descripcion : demo5.get('value') },
		         onComplete: function(items){
		          if( items.length>0 )
		          {
	                dojo.forEach(items,function(item){
	                     //console.log(item.name);
	                     demo5.set('value',item.descripcion);
	                });
	             }
	             else
	             {
	             	
	             }
		         }			    
			   });
	  		}
		},
		cdemo5:function ()
		{
			require(
				[
				"dojo",
	 			"dojo/data/ItemFileReadStore",
	 			"dojo/request"
	 			], function(dojo,ItemFileReadStore,request)
	  	  		{
		          request.post("/sweb",{
	 					handleAs: "json",
	 					preventCache: true,
	 					data : { 
	 					 "c1" : dojo.cookie("c1"),
	 					 "c2" : dojo.cookie("c2"),
	 					 "c3" : "demo",
	 					 "demo" : "5" 					 
		          }
	 				}).then(function(datos){
	 					demo5Store = new ItemFileReadStore({data: datos});
						if( demo5.get('store')=='' ) { demo5.store.close(); }
					   demo5.set('store',demo5Store);
					   demo5._lastScrollTop=demo5.scrollTop;
	 				},
	  				function(error)
	  				{
	 						console.log("Error demo5:"+error);
	 				});				
			});	
		},
		vdemo4:function ()
		{
			if( demo4.get("value")==" " || demo4.get("value")=="" || demo4.get("value")==null )
	  		{
	     		//console.log("1");
	  		}
	  		else if( !isNaN(parseFloat(demo4.get("value"))) && isFinite(demo4.get("value")) )
	  		{
	  			//Traduzco opcional a Prueba
				demo4Store.fetch({
		         query: {codigo : demo4.get('value') },
		         onComplete: function(items){
		          if( items.length>0 )
		          {
	                dojo.forEach(items,function(item){
	                     //console.log(item.name);
	                     demo4.set('value',item.descripcion);
	                });
	             }
	             else
	             {
	             	
	             }
		         }			    
			   }); 
	  		}
	  		else 
	  		{
	  			//Traduzco opcional a Prueba
				demo4Store.fetch({
		         query: {descripcion : demo4.get('value') },
		         onComplete: function(items){
		          if( items.length>0 )
		          {
	                dojo.forEach(items,function(item){
	                     //console.log(item.name);
	                     demo4.set('value',item.descripcion);
	                });
	             }
	             else
	             {
	             	
	             }
		         }			    
			   });
	  		}
		},
		cdemo4:function ()
		{
			require(
				[
				"dojo",
	 			"dojo/data/ItemFileReadStore",
	 			"dojo/request"
	 			], function(dojo,ItemFileReadStore,request)
	  	  		{
		          request.post("/sweb",{
	 					handleAs: "json",
						preventCache: true,
	 					data : { 
	 					 "c1" : dojo.cookie("c1"),
	 					 "c2" : dojo.cookie("c2"),
	 					 "c3" : "demo",
	 					 "demo" : "4" 					 
		          }
	 				}).then(function(datos){
	 					demo4Store = new ItemFileReadStore({data: datos});
						if( demo4.get('store')=='' ) { demo4.store.close(); }
					   demo4.set('store',demo4Store);
					   demo4._lastScrollTop=demo4.scrollTop;
	 				},
	  				function(error)
	  				{
	 						console.log("Error demo4:"+error);
	 				});				
			});
		},
		vdemo8: function ()
		{
			if( demo8.get("value")==" " || demo8.get("value")=="" || demo8.get("value")==null )
	  		{
	     		//console.log("1");
	  		}
	  		else if( !isNaN(parseFloat(demo8.get("value"))) && isFinite(demo8.get("value")) )
	  		{
	  			//Traduzco opcional a Prueba
				demo8Store.fetch({
		         query: {codigo : demo8.get('value') },
		         onComplete: function(items){
		          if( items.length>0 )
		          {
	                dojo.forEach(items,function(item){
	                     //console.log(item.descripcion[0]);
	                     demo8.set('value',item.descripcion[0]);
	                });
	             }
	             else
	             {
	             	
	             }
		         }			    
			   }); 
	  			}
	  		else 
	  		{
	  			//Traduzco opcional a Prueba
				demo8Store.fetch({
		         query: {descripcion : demo8.get('value') },
		         onComplete: function(items){
		          if( items.length>0 )
		          {
	                dojo.forEach(items,function(item){
	                     //console.log(item.descripcion);
	                     demo8.set('value',item.descripcion[0]);
	                });
	             }
	             else
	             {
	             	
	             }
		         }			    
			   });
	  		} 
		},
		cdemo8: function () 
		{
			require(
				[
				"dojo",
	 			"dojo/data/ItemFileReadStore",
	 			"dojo/request"
	 			], function(dojo,ItemFileReadStore,request)
	  	  		{
		          request.post("/sweb",{
	 					handleAs: "json",
	 					preventCache: true,
	 					data : { 
	 					 "c1" : dojo.cookie("c1"),
	 					 "c2" : dojo.cookie("c2"),
	 					 "c3" : "demo",
	 					 "demo" : "8" 					 
		          }
	 				}).then(function(datos){
	 					demo8Store = new ItemFileReadStore({data: datos});
						if( demo8.get('store')=='' ) { demo8.store.close(); }
					   demo8.set('store',demo8Store);
					   demo8._lastScrollTop=demo8.scrollTop;
	 				},
	  				function(error)
	  				{
	 						console.log("Error demo8:"+error);
	 				});				
			});	
		}
	});
});