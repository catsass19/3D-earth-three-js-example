(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{36:function(e,n,r){"use strict";r.r(n);var t=r(1),o=r(0),i=r.n(o),a=r(31),c=r(32),d=r.n(c),l=r(34),s=r.n(l),u=[6710886,8947848,11184810],m=0,p=function(){return m=(m+1)%u.length,new a.Color(u[m])},w=function(e){var n=[];for(m=0;m<e;m++)n.push(new a.Vector3(2*Math.random()-1,2*Math.random()-1,2*Math.random()-1));return n},f={flex:1,padding:"3px",display:"flex",flexDirection:"column"},h={flex:1,border:"1px solid #444",overflow:"hidden"},v=function(e){function n(){var n=null!==e&&e.apply(this,arguments)||this;return n.origin=new a.Vector3(0,0,0),n.resizeHandler=d()((function(){n.camera.aspect=n.content.clientWidth/n.content.clientHeight,n.camera.updateProjectionMatrix(),n.renderer.setSize(n.content.clientWidth,n.content.clientHeight)}),100),n.init=function(){n.scene=new a.Scene,n.camera=new a.PerspectiveCamera(50,null,.1,1e3),n.camera.position.set(40,5,0),n.camera.lookAt(new a.Vector3(0,0,0)),n.renderer=new a.WebGLRenderer({alpha:!0,antialias:!0}),n.control=new(s()(a))(n.camera,n.renderer.domElement),n.control.zoomSpeed=.2,n.renderer.render(n.scene,n.camera),n.renderer.setSize(n.content.clientWidth,n.content.clientHeight),n.content.appendChild(n.renderer.domElement),n.resizeHandler(),window.addEventListener("resize",n.resizeHandler),n.animate()},n.addAxis=function(){var e=new a.GridHelper(100,30,4473924,3355443);n.scene.add(e)},n.animate=function(){n.control.update(),requestAnimationFrame(n.animate),n.renderer.render(n.scene,n.camera)},n.setContent=function(e){return n.content=e},n.renderArrows=function(){w(3348).forEach((function(e){n.addArrow(e,Math.random()+4,p())}));var e=new a.Vector3(1,1.5,1);e.normalize(),n.addArrow(e,15,new a.Color("cyan"),1)},n.addArrow=function(e,r,t,o){void 0===r&&(r=10),void 0===t&&(t=16776960),void 0===o&&(o=.4);var i=new a.ArrowHelper(e,n.origin,r,t,o);n.scene.add(i)},n}return Object(t.b)(n,e),n.prototype.componentDidMount=function(){this.init(),this.addAxis(),this.renderArrows()},n.prototype.componentWillUnmount=function(){window.removeEventListener("resize",this.resizeHandler)},n.prototype.render=function(){return i.a.createElement("div",{style:f},i.a.createElement("div",{ref:this.setContent,style:h}))},n}(i.a.Component);n.default=v}}]);