var JpdbBaseURl = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var stdDBName = "Student-DB";
var stdRelationName = "Std-rel";
var connToken = "90937535|-31949291966202725|90942969";

$("#stdId").focus();

//form validation
function validateform() {
  var stdId = $("#stdId").val();
  if (stdId === "") {
    alert("Please enter Student ID");
    $("#stdId").focus();
    return "";
  }
  var stdName = $("#stdName").val();
  if (stdName === "") {
    alert("Please enter Student Name");
    $("#stdName").focus();
    return "";
  }
  var gdName = $("#gdName").val();
  if (gdName === "") {
    alert("Please enter Student Gurdian name");
    $("#gdName").focus();
    return "";
  }
  var stdEmail = $("#stdEmail").val();
  if (stdEmail === "") {
    alert("Please enter Student Gurdian email");
    $("#stdEmail").focus();
    return "";
  }
  var MobNo = $("#MobNo").val();
  if (MobNo === "") {
    alert("Please enter Mobile No");
    $("#mobNo").focus();
    return "";
  }

  var jsonObj = {
    id: stdId,
    name: stdName,
    guirdian: gdName,
    Email: stdEmail,
    Mobil: MobNo,
  };
  return JSON.stringify(jsonObj);
}

//reset data
function resetData() {
  $("#stdId").val(" ");
  $("#stdName").val(" ");
  $("#gdName").val(" ");
  $("#stdEmail").val(" ");
  $("#MobNo").val(" ");
  $("#stdId").focus();
}

function saveRecNo(jsonObj) {
  var RecNo = JSON.parse(jsonObj.data);
  localStorage.setItem("recno", RecNo.rec_no);
}

function getStdIdAsJson() {
  var stdid = $("#stdId").val();
  var jsonStr = {
    id: stdid,
  };
  return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
  saveRecNo(jsonObj);
  var result = JSON.parse(jsonObj.data).record;
  $("#stdName").val(result.name);
  $("#gdName").val(result.guirdian);
  $("#stdEmail").val(result.Email);
  $("#MobNo").val(result.Mobil);
}

//save data methode
function saveData() {
  var jsonstr = validateform();
  if (jsonstr == "") {
    return "";
  }
  var putReqStr = createPUTRequest(
    connToken,
    jsonstr,
    stdDBName,
    stdRelationName
  );
  jQuery.ajaxSetup({ async: false });
  var resultObj = executeCommandAtGivenBaseUrl(putReqStr, JpdbBaseURl, jpdbIML);
  jQuery.ajaxSetup({ async: true });
  resetData();
  $("#stdId").focus();
}

//
function getStd() {
  var StdIdJsonObj = getStdIdAsJson();
  var getReq = createGET_BY_KEYRequest(
    connToken,
    stdDBName,
    stdRelationName,
    StdIdJsonObj
  );
  jQuery.ajaxSetup({ async: false });
  var resultJsonObj = executeCommandAtGivenBaseUrl(
    getReq,
    JpdbBaseURl,
    jpdbIRL
  );
  jQuery.ajaxSetup({ async: true });
  if (resultJsonObj.status === 400) {
    $("#save").prop("disabled", false);
    $("#reset").prop("disabled", false);
    $("#stdName").focus();
  } else if (resultJsonObj.status === 200) {
    $("#stdId").prop("disabled", false);
    fillData(resultJsonObj);

    $("#update").prop("disabled", false);
    $("#reset").prop("disabled", false);
    $("#stdName").focus();
  }
}

//update
function updatedata() {
  $("#update").prop("disabled", true);
  jsonupdt = validateform();
  var updateReq = createUPDATERecordRequest(
    connToken,
    jsonupdt,
    stdDBName,
    stdRelationName,
    localStorage.getItem("rec_no")
  );
  jQuery.ajaxSetup({ async: false });
  var resultObj = executeCommandAtGivenBaseUrl(updateReq, JpdbBaseURl, jpdbIML);
  jQuery.ajaxSetup({ async: true });
  console.log(resultObj);
  $("#stdId").focus();
}
