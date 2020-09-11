(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["app~ea1f58e8"],{"189c":function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var a=Object({NODE_ENV:"production",VUE_APP_ENV:"clinic",VUE_APP_CLIENT_URL:"https://client.voycare.com",VUE_APP_BASE_URL:"https://api.voycare.com/",VUE_APP_HOME:"https://voycare.com",BASE_URL:"/"}).VUE_APP_PROVIDER_URL,r={login_url:a+"/login",register_url:a+"/register"}},"37b6":function(t,e,n){"use strict";e["a"]={STATUS:{intToString:function(t){switch(t){case 0:return"Pending";case 1:return"Confirmed";case 2:return"Cancelled";case 3:return"Completed";case 4:return"Rescheduled";case 5:return"Refunded";default:return"Unknown"}},paymentStatusString:function(t){switch(t){case 1:return"Draft";case 2:return"Sent";default:return"Unknown"}},verifyToString:function(t){switch(t){case 0:return"Pending";case 1:return"Confirmed";case 2:return"Declined";default:return"Unknown"}},isPending:function(t){return 0===t},isConfirmed:function(t){return 1===t},isCancelled:function(t){return 2===t},isRescheduled:function(t){return 4===t},isRefunded:function(t){return 5===t},stringToInt:function(t){switch(t.toLowerCase()){case"pending":return 0;case"confirmed":return 1;case"cancelled":return 2;case"completed":return 3;case"rescheduled":return 4;case"refunded":return 5;default:return-1}},intToExtraString:function(t){switch(t){case 1:return"fa fa-check";case 0:case 2:case 4:return"fa fa-clock-o";case 3:return"fa fa-minus"}},intToExtraClass:function(t){switch(t){case 1:return"text-success";case 0:case 2:case 4:return"text-danger";case 3:return""}},intToVerifyClass:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"alert";switch(t){case 0:return e+"-warning";case 1:return e+"-success";case 2:return e+"-dark";default:return""}},intToPaymentStatus:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"alert";switch(t){case 1:return e+"-warning";case 2:return e+"-success";default:return""}},intToStatusClass:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"alert";switch(t){case 0:return e+"-warning";case 1:return e+"-success";case 2:return e+"-danger-bold";case 3:return e+"-danger";case 4:return e+"-primary";case 5:return e+"-danger";default:return""}}},APPOINTMENT:{MODE:{intToString:function(t){switch(t){case 1:return"audio/video";case 2:return"site visit";case 3:return"so";default:return"unknown"}}}},PAGE_LIMIT_OPTIONS:[{value:10,text:10},{value:20,text:20},{value:50,text:50}]}},"4efb":function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var a="https://client.voycare.com",r={login_url:a+"/login",register_url:a+"/register"}},"6a37":function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var a=n("d4ec"),r=n("bee2"),i=function(){function t(){Object(a["a"])(this,t)}return Object(r["a"])(t,null,[{key:"isClinic",value:function(){return!0}},{key:"isClient",value:function(){return!1}},{key:"isAdmin",value:function(){return!1}}]),t}()},"7c15":function(t,e){t.exports={getApi:function(t){return this.BASE+t},CONST:{ROLE:{CLIENT:0,CLINIC:1,ADMIN:2},GENDER:{MALE:1,FEMALE:2,OTHER:3}},BASE:"https://api.voycare.com/",AUTH:{LOGIN:"api/auth/login",REGISTER:"api/auth/register",FORGET_PASSWORD:"api/auth/forgot-pass"},CLIENT:{APPOINTMENT:{LIST:"api/user/appointments"},LOGOUT:"api/logout"},ADMIN:{AUTH:{LOGIN:"api/auth/admin/login",REGISTER:"api/auth/register",FORGET_PASSWORD:"api/auth/forgot-pass"},APPOINTMENT:{LIST:"api/admin/appointments"},DOCTOR:{LIST:"api/admin/list-doctor"},CLINIC:{LIST:"api/admin/list-clinic"},CLIENT:{LIST:"api/admin/list-client"}}}},c0d6:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var a=n("6105"),r=n("2f62"),i=n("2b0e"),u={namespaced:!0,state:{alert_message:null},mutations:{setAlertMessage:function(t,e){var n=e.message;t.alert_message=n}},actions:{showMessage:function(t,e){var n=e.message;t.commit("setAlertMessage",{message:n}),window.jQuery("#toast__app").toast("show")},showModal:function(t,e){var n=e.message;t.commit("setAlertMessage",{message:n}),window.jQuery("#modal__app").modal("show")}}},s=u;i["default"].use(r["a"]);var o=new r["a"].Store({modules:{app:s},state:{countries:null,settings:[],appt_types:[],appt_status:[],appt_specialty:[],appt_fertility:[],appt_counseling:[],appt_treatments:[],appt_languages:[],isMetaFetched:!1},getters:{countries:function(t){return t.countries},settings:function(t){return t.settings},appt_types:function(t){return t.appt_types},appt_status:function(t){return t.appt_status},appt_specialty:function(t){return t.appt_specialty},appt_fertility:function(t){return t.appt_fertility},appt_counseling:function(t){return t.appt_counseling},appt_treatments:function(t){return t.appt_treatments},appt_languages:function(t){return t.appt_languages}},mutations:{updateSettings:function(t,e){t.settings=e},updateCountries:function(t,e){t.countries=e},updateMetas:function(t,e){var n=e.status,a=e.types,r=e.specialty,i=e.fertility,u=e.counseling,s=e.treatment,o=e.languages;t.appt_status=n,t.appt_types=a,t.appt_specialty=r,t.appt_fertility=i,t.appt_counseling=u,t.appt_treatments=s,t.appt_languages=o},updateIsMetaFetched:function(t,e){t.isMetaFetched=e}},actions:{getAppointmentMetas:function(t){var e=t.state,n=t.commit;e.isMetaFetched||a["a"].getRequest("CommonRequest").getAppointmentMetas().then((function(t){var e=t.data;e.types,e.status;n("updateMetas",t.data),n("updateIsMetaFetched",!0)}))},getCountries:function(t){t.state.countries||a["a"].getRequest("CommonRequest").getCountries().then((function(e){var n=e.data.datas;t.commit("updateCountries",n)}))},getSettings:function(t){a["a"].getRequest("CommonRequest").getSettings().then((function(e){var n=e.data;t.commit("updateSettings",n)}))}}})},d584:function(t,e,n){"use strict";n("d3b7"),n("25f0");var a=n("c1df"),r=n.n(a);e["a"]={getName:function(t){return t.last_name+" "+t.first_name},formatDate:function(t,e){return r()(t,"yyyy-mm-dd hh:mm:ii").format(e)},formatHour:function(t){return r()(t,"yyyy-mm-dd hh:mm:ii").format("hh:mm")},intToDate:function(t,e){return r.a.unix(t).format(e)},intToAge:function(t){return r()().diff(r.a.unix(t),"year")},intToHour:function(t){return r()(t.toString(),"LT").format("hh:mm A")}}},fa7d:function(t,e,n){n("a15b9"),n("4d90"),t.exports={gg:function(){return 3},padStart:function(t,e,n){return n=n||"0",t+="",t.length>=e?t:new Array(e-t.length+1).join(n)+t},getLocalAdmin:function(){return localStorage.getItem("admin")?JSON.parse(localStorage.getItem("admin")):null},setLocalAdmin:function(t){localStorage.setItem("admin",JSON.stringify(t))},removeLocalAdmin:function(){localStorage.removeItem("admin")},getLocalUser:function(){return localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null},setLocalUser:function(t){localStorage.setItem("user",JSON.stringify(t))},removeLocalUser:function(){localStorage.removeItem("user")},getLocalClinic:function(){return localStorage.getItem("clinic")?JSON.parse(localStorage.getItem("clinic")):null},setLocalClinic:function(t){localStorage.setItem("clinic",JSON.stringify(t))},removeLocalClinic:function(){localStorage.removeItem("clinic")},getMessageFromCode:function(t){switch(t){case 204:return" the request was successful but there is no representation to return";default:return null}},getToken:function(){return localStorage.getItem("token")},randomStr:function(t){for(var e="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",a=n.length,r=0;r<t;r++)e+=n.charAt(Math.floor(Math.random()*a));return e},getTimeRange:function(){for(var t=[],e=0;e<=23;e++){var n="00",a=(e+"").padStart(2,"0");t.push({hour:a,min:n}),n=30,t.push({hour:a,min:n})}return t},getLocalTimeZoneOffsetTo:function(t){var e=new Date,n=e.getTimezoneOffset()/60;return n-(0-t)}}}}]);
//# sourceMappingURL=app~ea1f58e8.185bdf3d.js.map