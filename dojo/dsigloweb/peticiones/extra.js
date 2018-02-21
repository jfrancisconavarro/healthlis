define(["dojo/_base/declare",
"dojo/on",
"dojo/domReady!"], function(declare,on){
	return declare(null, {
	vf1: function( tipo )
	{
		if( tipo==1 )
		{
			if( f1.get("value")=='NO INTRODUCIR' || f1.get("value")=='0000000' )
	 		{
	 			f2.focus();
	 		}
	 		else if( f1.get("value")=='FECHA PRESCIPCIÓN')
	 		{
	 			f1.set('value',wutil.hoy(),false);
	 			f2.focus();
	 		}
	 	}
	 	else if( tipo==2 )
		{
	 		if( dojo.query('label[for=f1]')[0].innerHTML=='Operación' )
			{
				if( parseInt(f1.get('value'))==0 ){ f1.set('value','0000000') }
			} 
			else if (demo1.get('value').match(/.*GENERALI.*/))
			{
				var contenido = "";
				var elementos = pedidas.get('value');
				if( elementos == '' || typeof elementos == 'undefined' )
				{
					dialogo.set('content','Pruebas Vacias')
					dialogo.show();
				}
				else
				{
					dojo.forEach(elementos,function(item)
					{
						contenido = contenido + item + ", ";
					});
					contenido = contenido.slice(0, -2);
					require(
						[
						"dojo",
			 			"dojo/request"
			 			], function(dojo,request)
			  	  		{
			  	  			standby.show();
				          request.post("/sweb",{
			 					handleAs: "json",
								preventCache: true,
			 					data : { 
			 					 "c1" : dojo.cookie("c1"),
			 					 "c2" : dojo.cookie("c2"),
			 					 "c3" : "wstarjeta",	
			 					 "tarjeta" : f1.get("value"),
			 					 "tarifa" : tarifa,
			 					 "pedidas" : contenido		 
				          }
			 				}).then(function(datos){
			 					standby.hide();
			 					//console.log("Datos:"+datos.items[0].pmensaje);
			 					f5.set("value", datos.items[0].pmensaje);
			 				},
			  				function(error)
			  				{
			  					standby.hide();
			 					//console.log("Error Catalogo:"+error);
			 						
			 				});				
					});
				}					
			}
			else if( wutil.vtarjetas( padreSolicitudes.gettipof(1), f1.get('value'), padreSolicitudes.getlongitudf(1) ) )
			{
				
			}
			else
			{
				f1.set("state", "Error");
         	f1.set("message", "Error en datos");
			}
		}
		else if( tipo==3 )
		{			
 			if( f2.get('disabled')==true )
 			{
			  if( f3.get('disabled')==true )
			  {
			  	 demo8.focus();
			  }
			  else
			  {  
			    f3.focus(); 
			  } 
			     				     			
 			}
 			else
 			{
    			f2.focus();       			
 			}        			
		}
	},
	vf2: function( tipo )
	{
		if( tipo==1 )
		{
			if( f2.get("value")=='NO INTRODUCIR' || f2.get("value")=='0000000' )
    		{
    			f3.focus();
    		}
    		else if( f2.get("value")=='FECHA PRESCIPCIÓN')
    		{
    			f2.set('value',wutil.hoy(),false);
    			f3.focus();
    		}
    		/*else
    		{
    			f2.set('value','',false);
    		}*/
	 	}
	 	else if( tipo==2 )
		{
	 		if( dojo.query('label[for=f2]')[0].innerHTML=='Operación' )
			{
				if( parseInt(f2.get('value'))==0 ){ f2.set('value','0000000') }
			} 
			else if( wutil.vtarjetas( padreSolicitudes.gettipof(2), f2.get('value'), padreSolicitudes.getlongitudf(2) ) )
			{
				
			}
			else
			{
				f2.set("state", "Error");
         	f2.set("message", "Error en datos");
			} 
		}
		else if( tipo==3 )
		{
 			if( f3.get('disabled')==true )
 			{
			  if( f4.get('disabled')==true )
			  {
			  	 demo8.focus();
			  }
			  else
			  {  
			    f4.focus(); 
			  } 
			     				     			
 			}
 			else
 			{
    			f3.focus();       			
 			}       			
		}
	},
	vf3: function( tipo )
	{
		if( tipo==1 )
		{
			if( f3.get("value")=='NO INTRODUCIR' || f3.get("value")=='0000000')
    		{
    			f4.focus();
    		}
    		else if( f3.get("value")=='FECHA PRESCIPCIÓN')
    		{
    			f3.set('value',wutil.hoy(),false);
    			f4.focus();
    		}
    		/*else
    		{
    			f3.set('value','',false);
    		}*/
	 	}
	 	else if( tipo==2 )
		{
	 		if( dojo.query('label[for=f3]')[0].innerHTML=='Operación' )
			{
				if( parseInt(f3.get('value'))==0 ){ f3.set('value','0000000') }
			} 
			else if( wutil.vtarjetas( padreSolicitudes.gettipof(3), f3.get('value'), padreSolicitudes.getlongitudf(3) ) )
			{
				
			}
			else
			{
				f3.set("state", "Error");
         	f3.set("message", "Error en datos");
			} 
		}
		else if( tipo==3 )
		{	
 			if( f4.get('disabled')==true )
 			{
			  if( f5.get('disabled')==true )
			  {
			  	 demo8.focus();
			  }
			  else
			  {  
			    f5.focus(); 
			  } 
			     				     			
 			}
 			else
 			{
    			f4.focus();       			
 			}     			
		}
	},
	vf4: function( tipo )
	{
		if( tipo==1 )
		{
			if( f4.get("value")=='NO INTRODUCIR' || f4.get("value")=='0000000')
    		{
    			f5.focus();
    		}
    		else if( f4.get("value")=='FECHA PRESCIPCIÓN')
    		{
    			f4.set('value',wutil.hoy(),false);
    			f5.focus();
    		}
    		/*else
    		{
    			f4.set('value','',false);
    		}*/
	 	}
	 	else if( tipo==2 )
		{
	 		if( dojo.query('label[for=f4]')[0].innerHTML=='Operación' )
			{
				if( parseInt(f4.get('value'))==0 ){ f4.set('value','0000000') }
			} 
			else if( wutil.vtarjetas( padreSolicitudes.gettipof(4), f4.get('value'), padreSolicitudes.getlongitudf(4) ) )
			{

			}
			else
			{
				console.log("Error");
				f4.set("state", "Error");
         	f4.set("message", "Error en datos");
			}   
		}
		else if( tipo==3 )
		{
 			if( f5.get('disabled')==true )
 			{
			  if( f6.get('disabled')==true )
			  {
			  	 demo8.focus();
			  }
			  else
			  {  
			    f6.focus(); 
			  } 
			     				     			
 			}
 			else
 			{
    			f5.focus();       			
 			}     			
		}
	},
	vf5: function( tipo )
	{
		if( tipo==1 )
		{
			if( f5.get("value")=='NO INTRODUCIR' || f5.get("value")=='0000000')
    		{
    			f6.focus();
    		}
    		else if( f5.get("value")=='FECHA PRESCIPCIÓN')
    		{
    			f5.set('value',wutil.hoy(),false);
    			f6.focus();
    		}
    		/*else
    		{
    			f5.set('value','',false);
    		}*/
	 	}
	 	else if( tipo==2 )
		{
	 		if( dojo.query('label[for=f5]')[0].innerHTML=='Operación' )
			{
				if( parseInt(f5.get('value'))==0 ){ f5.set('value','0000000') }
			} 
			else if( wutil.vtarjetas( padreSolicitudes.gettipof(5), f5.get('value'), padreSolicitudes.getlongitudf(5) ) )
			{
				
			}
			else
			{
				f5.set("state", "Error");
         	f5.set("message", "Error en datos");
			}  
		}
		else if( tipo==3 )
		{	
 			if( f6.get('disabled')==true )
 			{
			  if( f7.get('disabled')==true )
			  {
			  	 demo8.focus();
			  }
			  else
			  {  
			    f7.focus(); 
			  } 
			     				     			
 			}
 			else
 			{
    			f6.focus();       			
 			}    			
		}
	},
	vf6: function( tipo )
	{
		if( tipo==1 )
		{
			if( f6.get("value")=='NO INTRODUCIR' || f6.get("value")=='0000000')
    		{
    			f7.focus();
    		}
    		else if( f6.get("value")=='FECHA PRESCIPCIÓN')
    		{
    			f6.set('value',wutil.hoy(),false);
    			f7.focus();
    		}
    		/*else
    		{
    			f6.set('value','',false);
    		}*/

	 	}
	 	else if( tipo==2 )
		{
	 		if( dojo.query('label[for=f6]')[0].innerHTML=='Operación' )
			{
				if( parseInt(f6.get('value'))==0 ){ f6.set('value','0000000') }
			} 
			else if( wutil.vtarjetas( padreSolicitudes.gettipof(6), f6.get('value'), padreSolicitudes.getlongitudf(6) ) )
			{
				
			}
			else
			{
				f6.set("state", "Error");
         	f6.set("message", "Error en datos");
			}   
		}
		else if( tipo==3 )
		{	
 			if( f7.get('disabled')==true )
 			{
			  if( f8.get('disabled')==true )
			  {
			  	 demo8.focus();
			  }
			  else
			  {  
			    f8.focus(); 
			  } 
			     				     			
 			}
 			else
 			{
    			f7.focus();       			
 			}    			
		}
	},
	vf7: function( tipo )
	{
		if( tipo==1 )
		{
			if( f7.get("value")=='NO INTRODUCIR' || f7.get("value")=='0000000')
    		{
    			f8.focus();
    		}
    		else if( f7.get("value")=='FECHA PRESCIPCIÓN')
    		{
    			f7.set('value',wutil.hoy(),false);
    			f8.focus();
    		}
    		/*else
    		{
    			f7.set('value','',false);
    		}*/
	 	}
	 	else if( tipo==2 )
		{
	 		if( dojo.query('label[for=f7]')[0].innerHTML=='Operación' )
			{
				if( parseInt(f7.get('value'))==0 ){ f7.set('value','0000000') }				
			} 
			else if( wutil.vtarjetas( padreSolicitudes.gettipof(7), f7.get('value'), padreSolicitudes.getlongitudf(7) ) )
			{
				
			}
			else
			{
				f7.set("state", "Error");
         	f7.set("message", "Error en datos");
			} 
		}
		else if( tipo==3 )
		{			
 			if( f8.get('disabled')==true )
 			{
				  demo8.focus();   				     			
 			}
 			else
 			{
    			f8.focus();       			
 			}   			
		}
	},
	vf8: function( tipo )
	{
		if( tipo==1 )
		{
			if( f8.get("value")=='NO INTRODUCIR' || f8.get("value")=='0000000')
    		{
    			demo8.focus();
    		}
    		else if( f8.get("value")=='FECHA PRESCIPCIÓN')
    		{
    			f8.set('value',wutil.hoy(),false);
    			demo8.focus();
    		}
    		/*else
    		{
    			f8.set('value','',false);
    		}*/
	 	}
	 	else if( tipo==2 )
		{
	 		if( dojo.query('label[for=f8]')[0].innerHTML=='Operación' )
			{
				if( parseInt(f8.get('value'))==0 ){ f8.set('value','0000000') }
			} 
			else if( wutil.vtarjetas( padreSolicitudes.gettipof(8), f8.get('value'), padreSolicitudes.getlongitudf(8) ) )
			{
				
			}
			else
			{
				f8.set("state", "Error");
         	f8.set("message", "Error en datos");
			}  
		}
		else if( tipo==3 )
		{			
 			demo8.focus();			
		}
	},
	vpruebas: function ( items ) 
	{
		if( items.length>0 )
       {
       	existe=false;
          dojo.forEach(items,function(item){
          	dojo.forEach(pedidas.get('value'),function(item2)
          	{
       			if( item2==item.codigo)
       			{
       				//console.log("Pedidas1:SI");
       				existe=true;
       			}
          	});
					if(!existe)
             	{
						pedidas.set('value',item.codigo+','+pedidas.get('value'));
						prueba.set("value","",false);
						pedidas.set("readOnlyInput",true);
					}
					else
					{
						beep.play();
						//dialogo.set('content','Error en Prueba');
						//dialogo.show();
						prueba.set("value","",false);
						pedidas.set("readOnlyInput",true);							
					}	
          });
       }
       else
       {
       	beep.play();
       	//dialogo.set('content','Error en Prueba');
			//dialogo.show();
			prueba.set("value","",false);
       }
	},
	cpruebas: function ()
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
 					 "c3" : "catalogo",			 
	          }
 				}).then(function(datos){
 					pruebasStore = new ItemFileReadStore({data: datos});
					if( prueba.get('store')=='' ) { prueba.store.close(); }
				   prueba.set('store',pruebasStore);
				   prueba._lastScrollTop=prueba.scrollTop;
				   standby.hide();
 				},
  				function(error)
  				{
 						console.log("Error Catalogo:"+error);
 						standby.hide();
 				});				
		});
	},
	vform: function ()
	{
		if(form.validate())
      {
      	var contenido = "";
			var elementos = pedidas.get('value');
			if( elementos == '' || typeof elementos == 'undefined' )
			{
				dialogo.set('content','Pruebas Vacias')
				dialogo.show();
			}
			else
			{
				dojo.forEach(elementos,function(item)
				{
					contenido = contenido + item + ", ";
				});
				contenido = contenido.slice(0, -2);
				standby.show();
				require(["dojo/request"], function(request){
					request.post("/sweb",{
    					handleAs: "json",
    					preventCache: true,
    					data : {
    						"c1" : dojo.cookie("c1"),
    					   "c2" : dojo.cookie("c2"),
    						"c3" : "crearsolicitud",
    						"esid" : sid.get("value"),
    						"efecha" : fecha.get("value"),
    						"epid" : pid.get("value"),
    						"enombre" : nombre.get("value"),
    						"eape1" : ape1.get("value"),
    						"eape2" : ape2.get("value"),
    						"efnac" : fnac.get("value"),
    						"eedad" : edad.get("value"),
    						"esexo" : sexo.get("value"),
    						"demo0" : demo0.get("value"),
    						"demo1" : demo1.get("value"),
    						"demo2" : demo2.get("value"),
    						"demo3" : demo3.get("value"),
    						"demo4" : demo4.get("value"),
    						"demo5" : demo5.get("value"),
							"demo6" : demo6.get("value"),
							"demo7" : demo7.get("value"),
							"demo8" : demo8.get("value"),
							"demo9" : demo9.get("value"),		
    						"extra0" : extra0.get("value"),
    						"extra1" : extra1.get("value"),
    						"extra2" : extra2.get("value"),
    						"extra3" : extra3.get("value"),
    						"extra4" : extra4.get("value"),
    						/*"ef1" : f1.get("value"),
    						"ef2" : f2.get("value"),
							"ef3" : f3.get("value"),
							"ef4" : f4.get("value"),
							"ef5" : f5.get("value"),
							"ef6" : f6.get("value"),
							"ef7" : f7.get("value"),
							"ef8" : f8.get("value"),*/							
							"epwd" : pwd.get("value"),							
							//"comana" : comana.get("value"),
							//"compac" : compac.get("value"),
							"epedidas" : contenido				
    					}
    				}).then(function(datos){
						if( datos.status == 'si' )
						{
							dialogo.set('content','Análisis Guardado');
				         dialogo.show();
				         padreSolicitudes.limpiar();						
						}
						else if( datos.status == 'no' )
						{
							dialogo.set('content','Error al guardar:'+datos.message);
				         dialogo.show();
				         fecha.set('displayedValue',wutil.hoy(),false);									
						}	
						standby.hide();
    				},
     				function(error){
     					dialogo.set('content',error.message);
				      dialogo.show();
				      standby.hide();
    				});				
				});	
			}	 
     }
	},
	vvolex: function () 
	{
		//if(form.validate() && pedidas.get("value").length>0 )
   	//{
			var contenido = "";
			var elementos = pedidas.get('value');
			if( elementos == '' || typeof elementos == 'undefined' )
			{
				dialogo.set('content','Pruebas Vacias')
				dialogo.show();
			}
			else
			{
				dojo.forEach(elementos,function(item)
				{
					contenido = contenido + item + ", ";
				});
				contenido = contenido.slice(0, -2);
				standby.show();
				require(["dojo/request"], function(request){
					request.post("/sweb",{
    					handleAs: "text",
    					preventCache: true,
    					data: {
    						"c1" : dojo.cookie("c1"),
    					   "c2" : dojo.cookie("c2"),
    						"c3" : "volex",
    						"esid" : sid.get("value"),
    						"efecha" : fecha.get("value"),
    						"epid" : pid.get("value"),
    						"enombre" : nombre.get("value"),
    						"eape1" : ape1.get("value"),
    						"eape2" : ape2.get("value"),
    						"efnac" : fnac.get("value"),
    						"eedad" : edad.get("value"),
    						"esexo" : sexo.get("value"),
    						"demo0" : demo0.get("value"),
    						"demo1" : demo1.get("value"),
    						"demo2" : demo2.get("value"),
    						"demo3" : demo3.get("value"),
    						"demo4" : demo4.get("value"),
    						"demo5" : demo5.get("value"),
							"demo6" : demo6.get("value"),
							"demo7" : demo7.get("value"),
							"demo8" : demo8.get("value"),
							"demo9" : demo9.get("value"),		
    						"extra0" : extra0.get("value"),
    						"extra1" : extra1.get("value"),
    						"extra2" : extra2.get("value"),
    						"extra3" : extra3.get("value"),
    						"extra4" : extra4.get("value"),
    						/*"ef1" : f1.get("value"),
    						"ef2" : f2.get("value"),
							"ef3" : f3.get("value"),
							"ef4" : f4.get("value"),
							"ef5" : f5.get("value"),
							"ef6" : f6.get("value"),
							"ef7" : f7.get("value"),
							"ef8" : f8.get("value"),*/							
							"epwd" : pwd.get("value"),							
							//"comana" : comana.get("value"),
							//"compac" : compac.get("value"),
							"epedidas" : contenido				
    					}
    				}).then(function(datos){
						window.open("data:application/pdf;base64, " + datos);
						standby.hide();
    				},
     				function(error){
     					console.log(error);
				      standby.hide();
    				});				
				});	
			}				
		/*}
		else
		{
			dialogo.set('content','Faltan datos por introducir');
		   dialogo.show();	
		}*/
	},
	actpaciente: function ()
	{
		nombre.set("disabled",false);
		ape1.set("disabled",false);
		ape2.set("disabled",false);
		fnac.set("disabled",false);
		sexo.set("disabled",false);
	},
	desactpaciente: function ()
	{
		nombre.set("disabled",true);
		ape1.set("disabled",true);
		ape2.set("disabled",true);
		fnac.set("disabled",true);
		sexo.set("disabled",true);
	},
	limppaciente: function ()
	{
		nombre.set("value","");
		ape1.set("value","");
		ape2.set("value","");
		fnac.set("value","");
		sexo.set("value","");
	}

	});
});