// =======================================
// FILE 3A
// firebase.js
// CUSTOM TTA MANAGER V2
// =======================================

// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {

getFirestore,

enableIndexedDbPersistence,

serverTimestamp,

Timestamp,

collection,

doc,

addDoc,

setDoc,

getDoc,

getDocs,

updateDoc,

deleteDoc,

query,

where,

orderBy,

limit,

writeBatch,

onSnapshot

} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import {

getAuth,

signInWithEmailAndPassword,

signOut,

onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// =======================================
// FIREBASE CONFIG
// =======================================

const firebaseConfig={

apiKey:"",

authDomain:"",

projectId:"",

storageBucket:"",

messagingSenderId:"",

appId:""

};

// =======================================
// INIT
// =======================================

const app=initializeApp(firebaseConfig);

const db=getFirestore(app);

const auth=getAuth(app);

// =======================================
// OFFLINE CACHE
// =======================================

enableIndexedDbPersistence(db)

.catch(()=>{});

// =======================================
// EXPORT
// =======================================

export{

app,

db,

auth,

serverTimestamp,

Timestamp,

collection,

doc,

addDoc,

setDoc,

getDoc,

getDocs,

updateDoc,

deleteDoc,

query,

where,

orderBy,

limit,

writeBatch,

onSnapshot,

signInWithEmailAndPassword,

signOut,

onAuthStateChanged

};

// =======================================
// COLLECTION NAME
// =======================================

export const COLLECTIONS={

users:"users",

teams:"teams",

salary:"salary",

history:"history",

payments:"payments",

debts:"debts",

settings:"settings",

notifications:"notifications",

trash:"trash",

statistics:"statistics"

};

// =======================================
// TEAM PRICE
// =======================================

export const TEAM_PRICE=5000;

export const CTV_SALARY=500;

// =======================================
// TIME SLOT
// =======================================

export const TIME_LIST=[

"10H00",

"13H00",

"15H00",

"18H00",

"20H00",

"22H00",

"23H50"

];

// =======================================
// BOX
// =======================================

export const BOX_LIST=[

1,2,3,4,5,6,7,8,9,10

];

// =======================================
// SLOT
// =======================================

export const SLOT_PER_TABLE=12;

// =======================================
// ROLE
// =======================================

export const ROLE={

ADMIN:"admin",

CTV1:"ctv1",

CTV2:"ctv2"

};

// =======================================
// END 3A
// =======================================// =======================================
// FILE 3B
// FIREBASE HELPERS
// =======================================

import {

db,

COLLECTIONS,

collection,

doc,

addDoc,

setDoc,

getDoc,

getDocs,

updateDoc,

deleteDoc,

query,

where,

orderBy,

limit,

writeBatch,

serverTimestamp

} from "./firebase.js";

// =======================================
// DATE
// =======================================

export function todayKey(){

const d=new Date();

const y=d.getFullYear();

const m=String(d.getMonth()+1).padStart(2,"0");

const day=String(d.getDate()).padStart(2,"0");

return `${y}-${m}-${day}`;

}

// =======================================
// TEAM PATH
// =======================================

export function teamCollection(){

return collection(

db,

COLLECTIONS.teams,

todayKey(),

"list"

);

}

// =======================================
// HISTORY PATH
// =======================================

export function historyCollection(){

return collection(

db,

COLLECTIONS.history,

todayKey(),

"logs"

);

}

// =======================================
// PAYMENT PATH
// =======================================

export function paymentCollection(){

return collection(

db,

COLLECTIONS.payments,

todayKey(),

"list"

);

}

// =======================================
// DEBT PATH
// =======================================

export function debtCollection(){

return collection(

db,

COLLECTIONS.debts

);

}

// =======================================
// SALARY PATH
// =======================================

export function salaryCollection(){

return collection(

db,

COLLECTIONS.salary

);

}

// =======================================
// SETTINGS PATH
// =======================================

export function settingsDoc(){

return doc(

db,

COLLECTIONS.settings,

"system"

);

}

// =======================================
// SAVE HISTORY
// =======================================

export async function saveHistory(

action,

user,

detail

){

await addDoc(

historyCollection(),

{

action,

user,

detail,

time:serverTimestamp()

}

);

}

// =======================================
// SAVE TEAM
// =======================================

export async function saveTeam(team){

team.createdAt=serverTimestamp();

return await addDoc(

teamCollection(),

team

);

}

// =======================================
// UPDATE TEAM
// =======================================

export async function updateTeam(

id,

data

){

await updateDoc(

doc(

teamCollection(),

id

),

data

);

}

// =======================================
// DELETE TEAM
// =======================================

export async function deleteTeam(id){

await deleteDoc(

doc(

teamCollection(),

id

)

);

}

// =======================================
// GET TEAM
// =======================================

export async function getTeam(id){

return await getDoc(

doc(

teamCollection(),

id

)

);

}

// =======================================
// GET ALL TEAM
// =======================================

export async function getAllTeams(){

const q=query(

teamCollection(),

orderBy(

"createdAt",

"asc"

)

);

return await getDocs(q);

}

// =======================================
// END 3B
// =======================================// =======================================
// FILE 3C
// REALTIME + QUERY HELPERS
// =======================================

import{

db,

COLLECTIONS,

collection,

doc,

query,

where,

orderBy,

limit,

getDocs,

onSnapshot,

serverTimestamp,

setDoc,

updateDoc,

writeBatch

}from "./firebase.js";

import{

todayKey,

teamCollection,

historyCollection,

debtCollection,

salaryCollection

}from "./firebase.js";

// =======================================
// REALTIME TEAM
// =======================================

export function listenTeams(callback){

const q=query(

teamCollection(),

orderBy("createdAt","asc")

);

return onSnapshot(q,(snap)=>{

const arr=[];

snap.forEach(doc=>{

arr.push({

id:doc.id,

...doc.data()

});

});

callback(arr);

});

}

// =======================================
// REALTIME DEBT
// =======================================

export function listenDebts(callback){

return onSnapshot(

debtCollection(),

(snap)=>{

const arr=[];

snap.forEach(doc=>{

arr.push({

id:doc.id,

...doc.data()

});

});

callback(arr);

}

);

}

// =======================================
// REALTIME HISTORY
// =======================================

export function listenHistory(callback){

const q=query(

historyCollection(),

orderBy("time","desc"),

limit(300)

);

return onSnapshot(q,(snap)=>{

const arr=[];

snap.forEach(doc=>{

arr.push({

id:doc.id,

...doc.data()

});

});

callback(arr);

});

}

// =======================================
// REALTIME SALARY
// =======================================

export function listenSalary(callback){

return onSnapshot(

salaryCollection(),

(snap)=>{

const arr=[];

snap.forEach(doc=>{

arr.push({

id:doc.id,

...doc.data()

});

});

callback(arr);

}

);

}

// =======================================
// CHECK DUPLICATE TEAM
// =======================================

export async function teamExists(name){

const q=query(

teamCollection(),

where("name","==",name)

);

const rs=await getDocs(q);

return !rs.empty;

}

// =======================================
// SAVE SYSTEM SETTING
// =======================================

export async function saveSetting(data){

await setDoc(

doc(

db,

COLLECTIONS.settings,

"system"

),

{

...data,

updatedAt:serverTimestamp()

},

{

merge:true

}

);

}

// =======================================
// UPDATE SYSTEM SETTING
// =======================================

export async function updateSetting(data){

await updateDoc(

doc(

db,

COLLECTIONS.settings,

"system"

),

data

);

}

// =======================================
// BATCH UPDATE TEAM
// =======================================

export async function batchUpdate(list){

const batch=writeBatch(db);

list.forEach(item=>{

const ref=doc(

teamCollection(),

item.id

);

batch.update(ref,item.data);

});

await batch.commit();

}

// =======================================
// END 3C
// =======================================// =======================================
// FILE 3D
// AUTH + AUTO RESET + UTILITIES
// =======================================

import{

auth,

signOut,

onAuthStateChanged

}from "./firebase.js";

import{

todayKey,

saveHistory

}from "./firebase.js";

// =======================================
// USER
// =======================================

export let currentUser=null;

// =======================================
// AUTH LISTENER
// =======================================

onAuthStateChanged(auth,(user)=>{

currentUser=user||null;

});

// =======================================
// LOGOUT
// =======================================

export async function logout(){

try{

await signOut(auth);

location.reload();

}catch(e){

console.error(e);

}

}

// =======================================
// AUTO RESET
// =======================================

export function autoResetCheck(){

const now=new Date();

const h=now.getHours();

const m=now.getMinutes();

if(h===0&&m===0){

localStorage.removeItem("tta_today_cache");

}

}

// =======================================
// FORMAT MONEY
// =======================================

export function money(v){

return Number(v||0).toLocaleString("vi-VN")+"đ";

}

// =======================================
// FORMAT DATE
// =======================================

export function formatDate(date=new Date()){

const d=String(date.getDate()).padStart(2,"0");

const m=String(date.getMonth()+1).padStart(2,"0");

const y=date.getFullYear();

return `${d}/${m}/${y}`;

}

// =======================================
// FORMAT TIME
// =======================================

export function formatTime(date=new Date()){

const h=String(date.getHours()).padStart(2,"0");

const m=String(date.getMinutes()).padStart(2,"0");

return `${h}:${m}`;

}

// =======================================
// CREATE LOG
// =======================================

export async function logAction(action,user,detail){

try{

await saveHistory(action,user,detail);

}catch(e){

console.log(e);

}

}

// =======================================
// RANDOM ID
// =======================================

export function uid(){

return Math.random().toString(36).substring(2,12);

}

// =======================================
// CHECK NEW DAY
// =======================================

export function checkNewDay(){

const today=todayKey();

const last=localStorage.getItem("tta_last_day");

if(last!==today){

localStorage.setItem("tta_last_day",today);

return true;

}

return false;

}

// =======================================
// NOTIFICATION
// =======================================

export function notify(text){

const toast=document.getElementById("toast");

if(!toast) return;

toast.innerText=text;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2500);

}

// =======================================
// CONFIRM
// =======================================

export function ask(msg){

return window.confirm(msg);

}

// =======================================
// END FILE 3D
// =======================================
