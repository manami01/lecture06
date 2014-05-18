var INTERVAL = 1000; //インターバルが１０００(ミリ秒)。１０００＝１秒（５００＝０．５秒とかになる）
var DEFAULT_MESSAGE = "終了"; //メッセージで終了って出す（デフォルトメッセージだから、なんも設定しなかったら終了って出るようにしてる？？てかそうしたら出た）

var alarm = { //(アラームって関数に右側を代入している)
		duration: -1, //オブジェクトはグレゴリオ時間の時間を表し、6 つのフィールド (年、月、日、時間、分、秒) と記号 (+/-) フィールドから構成されているそうな。
		message: ""
};

var formatCounterAsString = function(){ //どこかでformatcounterAsStringが呼び出されたら
		return "あと" + alarm.duration + "秒"; // 『"あと" + alarm.duration + "秒"』を出す
};

var updateCounter = function(){
		alarm.output.textContent = formatCounterAsString(); //alarmで表示する文はformatcounterAsString
};

var showAlarmMessage = function(){
		var message = DEFAULT_MESSAGE; //messageはデフォルトメッセージ
		if(alarm.message.length > 0){ //もしalarm.messageの長さが0より大きかったら
				message = alarm.message; //messageはalarm.message
		}
		if(Notification.permission == "granted"){ //もし、、
				var notification = new Notification(message);
		}
		alarm.output.textContent = message; //alarmで表示する文はmessage
};

var update = function(){ //以下updateの説明（まだカウントダウンできるかどうか調べる。まだ残り時間があったらカウントダウンしろ。それ以外はメッセージを表示しろ）
		alarm.duration = alarm.duration - 1; //alarmのdurationは、alarm.durationから1引いた数
		if(isReadyToCountdown()){ //もしisReadyToCountdownだったら
				updateCounter(); //updateCounterを呼び出す？？
				window.setTimeout(update, INTERVAL); //１秒後に、updateを呼び出す（(Window.setTimeoutのしくみ　window.setTimeout("呼び出す関数", "待機時間")で書く。引数に指定した「待機時間」だけ経過した後に「呼び出す関数」を呼び出す。待機時間はミリ秒単位で指定。つまり、INTERVALで指定した秒数（＝１秒）経過した後にupdateを呼び出す。）
		}else{ //それ以外は
				showAlarmMessage(); //AlarmMessageを表示する
		}
};

var isReadyToCountdown = function(){ //isReadyToCountdownとは、条件のひとつ（３０行目で使ってる）で、そのisReadyToCountdownとは（isReadyToCountdownの条件とは）
		return Number.isInteger(alarm.duration) && alarm.duration > 0; //&&とは「かつ」　isintagerとは、渡された数字が整数かどうか判定する　「かつ」　alarm.durection(.とは「〜の」)が、０より大きい
		//retunは「返してね」って意味。この場合、isReadyToCountdownはどこかから呼び出される訳だけど、それで「isInteger(alarm.duration) かつ alarm.duration > 0」だったら、呼んだとこに返す！！
	};

var setupAlarm = function(durationString, message){ //setupAlarmは durationString と　message
		alarm.duration = Number(durationString), //Numberとは、数値として扱えるものを生成する
		alarm.message = message; //alarm.messageとは、４3行目のmessage
};

var startAlarm = function(){ //ここから下、startAlarmの説明
		setupAlarm(alarm.durationSelect.value, alarm.messageInput.value); //setupAlarmとは、alarm.durationSelect.value と alarm.messageInput.valueの２つの数値から成り立っている
		if(isReadyToCountdown()){ //もしisReadyToCountdownだったら（isreadyToCountdownから帰ってきたら）
				updateCounter(); //updateCounterとは、名前付きカウンターの現行値を更新する。
				window.setTimeout(update, INTERVAL); //(Window.setTimeoutのしくみ　window.setTimeout("呼び出す関数", "待機時間")で書く。引数に指定した「待機時間」だけ経過した後に「呼び出す関数」を呼び出す。待機時間はミリ秒単位で指定。
					//つまり、INTERVALで指定した秒数（＝１秒）経過した後にupdateを呼び出す。

)
		}
};

var initApp = function(){ //initappとは、表示するウィンドウの定義とか登録だそうだ。
		alarm.durationSelect = document.querySelector("#duration"); //alarmのdurationSelect documentってHTMLのこと
		alarm.messageInput = document.querySelector("#message");
		alarm.output = document.querySelector("#countdown");

		Notification.requestPermission(function(status){
				if(Notification.permission != status){ //!=って等しくないって記号
						Notification.permission = status;
				}
		});

		var startButton = document.querySelector("#start");　//queryselectorとはCSSを指定して要素を取得するメッソドなんだと。
		startButton.addEventListener("click", startAlarm); //ボタンをクリックすると、startAlarmを呼び出す。
};

initApp();
