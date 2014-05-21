var INTERVAL = 1000; //インターバルが１０００(ミリ秒)。１０００＝１秒（５００＝０．５秒とかになる）
var DEFAULT_MESSAGE = "終了"; //メッセージで終了って出す（デフォルトメッセージだから、なんも設定しなかったら終了って出るようにしてる？？てかそうしたら出た）


var alarm = { //（アラームって関数に、右側を代入している）
		duration: -1,//オブジェクトはグレゴリオ時間の時間を表し、6 つのフィールド (年、月、日、時間、分、秒) と記号 (+/-) フィールドから構成されているそうな。
		yorei: 0,//予鈴のこと
		message: ""//アラームって変数に代入している
};


var formatCounterAsString = function(){//どこかでformatcounterAsStringが呼び出されたら
		return "あと" + alarm.duration + "秒"; //『"あと" + alarm.duration + "秒"』って返す
};

var updateCounter = function(){
		alarm.output.textContent = formatCounterAsString();　//alarmで表示する文はformatcounterAsString
};

var showAlarmMessage = function(){
		var message = DEFAULT_MESSAGE; //messageはデフォルトメッセージである
		if(alarm.message.length > 0){//もしalarm.messageの長さが0より大きかったら
				message = alarm.message; //messageはalarm.message
		}
		if(Notification.permission == "granted"){//もし、、、
				var notification = new Notification(message); //newの本質ってprototype、前のスタイルを受け継いだ新しいオブジェクトを作ることだよ
		}
		alarm.output.textContent = message; //alarmで表示する文はmessage

		window.setTimeout(touronUpdate, INTERVAL);
};

var update = function(){
		if (alarm.duration-1 == alarm.yorei ){//もしdurationが予鈴の値だったらアラームを出す。
			var yorei_notification = new Notification("予鈴です。");
		};
		alarm.duration = alarm.duration - 1; //alarmのdurationは、alarm.durationから1引いた数
		if(isReadyToCountdown()){ //もしisReadyToCountdownだったら
				updateCounter(); //updateCounterを呼び出す？？
				window.setTimeout(update, INTERVAL); //１秒後に、updateを呼び出す（(Window.setTimeoutのしくみ　window.setTimeout("呼び出す関数", "待機時間")で書く。引数に指定した「待機時間」だけ経過した後に「呼び出す関数」を呼び出す。待機時間はミリ秒単位で指定。つまり、INTERVALで指定した秒数（＝１秒）経過した後にupdateを呼び出す。）
		}else{ //それ以外（アラームが終了したとき）は
				showAlarmMessage(); //Alarm.messageを表示する
		}
};

var touronUpdate = function(){ //以下touronUpdateって新しい奴について

	alarm.touron = alarm.touron - 1;
	if(alarm.touron == 0){ //もしalarm.tpuronが0になったら
		alarm.output.textContent = "討論時間終了です。";//「討論時間終了です」って表示する
		var touron_notification = new Notification("討論時間終了です。");
		return;
	}
	alarm.output.textContent = "あと"+alarm.touron+"秒";
	window.setTimeout(touronUpdate, INTERVAL);//１秒後に、touronUpdsateを呼び出す

}

var isReadyToCountdown = function(){//isReadyToCountdownとは、条件のひとつで、そのisReadyToCountdownとは（isReadyToCountdownの条件とは）
		return Number.isInteger(alarm.duration) && alarm.duration > 0; //&&とは「かつ」　isintagerとは、渡された数字が整数かどうか判定する　「かつ」　alarm.durection(.とは「〜の」)が、０より大きい。retunは「返してね」って意味。この場合、isReadyToCountdownはどこかから呼び出される訳だけど、それで「isInteger(alarm.duration) かつ alarm.duration > 0」だったら、呼んだとこに返す！！
};

var setupAlarm = function(durationString, message, yorei, touron){ //setupAlarmは durationString と　message と yorei と touron
		alarm.duration = Number(durationString), //Numberとは、数値として扱えるものを生成する
		alarm.message = message;
		alarm.yorei = yorei;
		alarm.touron = touron;
};

var startAlarm = function(){ //ここから下、startAlarmの説明
		setupAlarm(alarm.durationSelect.value, alarm.messageInput.value, alarm.yoreiInput.value, alarm.touronInput.value);//setupAlarmとは、alarm.durationSelect.value と alarm.messageInput.value 、alarm.yoreiInput.value 、 alarm.touronInput.valueの４つの数値から成り立っている
		if(isReadyToCountdown()){ //もしisReadyToCountdownだったら（isreadyToCountdownから帰ってきたら）
				updateCounter();//updateCounterとは、名前付きカウンターの現行値を更新する。
				window.setTimeout(update, INTERVAL);//１秒後にupdateを呼び出す
		}
};

var initApp = function(){ //initappとは、表示するウィンドウの定義とか登録だそうだ。
		alarm.yoreiInput = document.querySelector("#yorei"); //alarmのdurationSelect documentってHTMLのこと
		alarm.durationSelect = document.querySelector("#duration");//ここらへんは変数に要素を代入している
		alarm.touronInput = document.querySelector("#touron");
		alarm.messageInput = document.querySelector("#message");
		alarm.output = document.querySelector("#countdown");

		Notification.requestPermission(function(status){
				if(Notification.permission != status){ //!=って等しくないって記号
						Notification.permission = status;
				}
		});

		var startButton = document.querySelector("#start");
		startButton.addEventListener("click", startAlarm);//スタートボタンをクリックするとイベントを追加する	
};

initApp();//関数が諸々定義されたあとに、、？
