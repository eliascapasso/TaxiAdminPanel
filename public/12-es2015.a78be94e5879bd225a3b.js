(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{GZeB:function(t,e,r){"use strict";r.r(e),r.d(e,"DashboardModule",(function(){return P}));var s=r("ofXK"),n=r("1kSV"),i=r("M0ag"),a=r("tyNb"),c=r("DNJ+"),b=r("hrwK"),o=r("5rLp"),u=r("ZZ88"),l=r("fXoL"),d=r("sYmb");let p=(()=>{class t{constructor(){this.event=new l.n}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=l.Fb({type:t,selectors:[["app-stat"]],inputs:{bgClass:"bgClass",icon:"icon",count:"count",label:"label",data:"data"},outputs:{event:"event"},decls:16,vars:9,consts:[[1,"card-header"],[1,"row"],[1,"col","col-xs-3"],[1,"col","col-xs-9","text-right"],[1,"d-block","huge"],[1,"d-block"],[1,"card-footer"],[1,"float-left"],["href","javascript:void(0)",1,"float-right","card-inverse"],[1,"fa","fa-arrow-circle-right"]],template:function(t,e){1&t&&(l.Qb(0,"div"),l.Qb(1,"div",0),l.Qb(2,"div",1),l.Qb(3,"div",2),l.Mb(4,"i"),l.Pb(),l.Qb(5,"div",3),l.Qb(6,"div",4),l.zc(7),l.Pb(),l.Qb(8,"div",5),l.zc(9),l.Pb(),l.Pb(),l.Pb(),l.Pb(),l.Qb(10,"div",6),l.Qb(11,"span",7),l.zc(12),l.Pb(),l.Qb(13,"a",8),l.Qb(14,"span"),l.Mb(15,"i",9),l.Pb(),l.Pb(),l.Pb(),l.Pb()),2&t&&(l.Bb("card text-white bg-",e.bgClass,""),l.yb(4),l.Bb("fa ",e.icon," fa-5x"),l.yb(3),l.Ac(e.count),l.yb(2),l.Ac(e.label),l.yb(3),l.Bc("View Details ",e.data,""))},styles:[""]}),t})();const h=function(){return["router-link-active"]},v=function(){return["/dashboard"]},g=function(){return["/passengers"]},f=function(){return["/drivers"]},y=function(){return["/cars"]},w=[{path:"",component:(()=>{class t{constructor(t,e,r,s){this.translate=t,this.passengerservice=e,this.driverService=r,this.carService=s,this.passengersCount=0,this.driversCount=0,this.carsCount=0}ngOnInit(){this.showMenu="",this.passengerservice.getPassengers().subscribe(t=>{this.passengersCount=t.length}),this.driverService.getDrivers().subscribe(t=>{this.driversCount=t.length}),this.carService.getCars().subscribe(t=>{this.carsCount=t.length})}changeLang(t){this.translate.use(t)}addExpandClass(t){this.showMenu=t===this.showMenu?"0":t}}return t.\u0275fac=function(e){return new(e||t)(l.Lb(d.d),l.Lb(o.a),l.Lb(b.a),l.Lb(c.a))},t.\u0275cmp=l.Fb({type:t,selectors:[["app-dashboard"]],decls:15,vars:33,consts:[[1,"text-muted"],[1,"row"],[1,"col-xl-6","col-lg-12",3,"routerLinkActive","routerLink"],[3,"bgClass","count","icon","label"]],template:function(t,e){1&t&&(l.Qb(0,"div"),l.Qb(1,"h2",0),l.zc(2,"Dashboard"),l.Pb(),l.Mb(3,"hr"),l.Qb(4,"div",1),l.Qb(5,"a",2),l.Mb(6,"app-stat",3),l.Pb(),l.Qb(7,"a",2),l.Mb(8,"app-stat",3),l.Pb(),l.Pb(),l.Mb(9,"hr"),l.Qb(10,"div",1),l.Qb(11,"a",2),l.Mb(12,"app-stat",3),l.Pb(),l.Qb(13,"a",2),l.Mb(14,"app-stat",3),l.Pb(),l.Pb(),l.Pb()),2&t&&(l.ic("@routerTransition",void 0),l.yb(5),l.ic("routerLinkActive",l.lc(25,h))("routerLink",l.lc(26,v)),l.yb(1),l.ic("bgClass","primary")("count",56)("icon","fa-map")("label","Trips"),l.yb(1),l.ic("routerLinkActive",l.lc(27,h))("routerLink",l.lc(28,g)),l.yb(1),l.ic("bgClass","warning")("count",e.passengersCount)("icon","fa-users")("label","Passengers"),l.yb(3),l.ic("routerLinkActive",l.lc(29,h))("routerLink",l.lc(30,f)),l.yb(1),l.ic("bgClass","success")("count",e.driversCount)("icon","fa-male")("label","Drivers"),l.yb(1),l.ic("routerLinkActive",l.lc(31,h))("routerLink",l.lc(32,y)),l.yb(1),l.ic("bgClass","danger")("count",e.carsCount)("icon","fa-car")("label","Cars"))},directives:[a.d,a.c,p],styles:[""],data:{animation:[Object(u.a)()]}}),t})()}];let C=(()=>{class t{}return t.\u0275mod=l.Jb({type:t}),t.\u0275inj=l.Ib({factory:function(e){return new(e||t)},imports:[[a.e.forChild(w)],a.e]}),t})(),P=(()=>{class t{}return t.\u0275mod=l.Jb({type:t}),t.\u0275inj=l.Ib({factory:function(e){return new(e||t)},imports:[[s.b,n.e,n.c,C,i.c]]}),t})()}}]);