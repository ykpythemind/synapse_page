
Vue.component('modal', {
  template: '#modal-template'
});


var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    started: false,
    playing: false,
    showButton: true,
    oncePlayed: false,
    mute: false,
    modalContent: "",
    showModal: false,
    transitioned: true,
    bar : document.getElementById("barinside"),
    data: {
      lyric: "",
      style: "",
      emoji: false
    },
    sound: {}
  },
  computed: {
    isAnimate: function() {
      return (this.oncePlayed && !this.playing);
    }
  },
  methods: {
    start: function() {
      if (this.started){ return false; }
      var that = this;
      this.started = true;
      this.data.lyric = ""
      if (this.playing !== true) {
        this.sound = new Howl({
          src: ['synapse.mp3'],
          format: ['mp3'],
          autoplay: true,
          volume: 1,
          mute: this.mute,
          onplay: function() {
            cache = 0;
            that.showButton = false;
            that.playing = true;
            that.transitioned = false;
          },
          onend: function() {
            that.playing = false;
            that.started = false;
            setTimeout(function(){ that.transitioned = true; }, 500);
            that.oncePlayed = true;
            that.showButton = true;
            that.bar.style.width = 0;
          }
        });
      }
    },
    toggleMute: function() {
      this.mute = !this.mute;
      if (this.playing) {
        this.sound.mute(this.mute);
      }
    },
    modalOpen: function(modal) {
      this.showModal = true;
      this.modalContent = modal;
    },
    modalClose: function() {
      this.showModal = false;
    },
    where: function() {
      console.log(this.sound.seek())
      this.sound.seek(165); // 途中から
    }
  }
});


var cache = 0;
var emoji_cnt = 0;
var t="";

setInterval(function() {
  var offset = 1.6;
  if (app.playing === true) {
    var now = app.sound.seek();
    app.bar.style.width = parseInt( window.innerWidth * now / app.sound.duration()) + "px";
    app.message = now;
    if (now > 100 && now < 120) {
      app.data.emoji = true;
      switch(emoji_cnt){
        case 0:
          t = "🌊"
          break;
        case 9:
          t = "🌊🌊"
          break;
        case 18:
          t = "🌊🌊🌊"
          break;
        case 27:
          t = ""
          break;
      }
      app.data.lyric = t
      emoji_cnt++;
      if (emoji_cnt > 36){
        emoji_cnt = 0;
      }
    } else {
      if (songData.length > cache) {
        if (songData[cache].time - offset < now) {
          app.data.lyric = songData[cache].lyric;
          if (typeof(songData[cache].emoji) !== 'undefined') {
            app.data.emoji = true;
          }else{
            app.data.emoji = false;
          }
          cache++;
        }
      }
    }
  }
}, 180);

var songData = [
  { lyric: "どうしようもできない", time: 3.8 },
  { lyric: "恋へと", time: 5.79 },
  { lyric: "あーあ　これはプレゼント", time: 7.85 },
  { lyric: "なるべくやめたいregret", time: 11.9 },
  { lyric: "うーう", time: 15.9 },
  { lyric: "シナプス", time: 16.87 },
  { lyric: "発火して大問題", time: 18.0 },
  { lyric: "💥💥💥", time: 20.45, emoji: true },
  { lyric: "出来すぎで今日はなんだか", time: 21.15 },
  { lyric: "問題物足りない", time: 24.70 },
  { lyric: "結構好みかも", time: 28.01 },
  { lyric: "眼を閉じると", time: 31.01 },
  { lyric: "昨日の君がいるだけさ", time: 32.75 },
  { lyric: "😴", time: 35.6, emoji: true },
  { lyric: "納得できない恋へと", time: 36.1 },
  { lyric: "あーあ　でも待ってたでしょう", time: 40.0 },
  { lyric: "いまさら変えないformat", time: 44.0 },
  { lyric: "うーう", time: 48.0 },
  { lyric: "シナプス", time: 49.1 },
  { lyric: "同期して近未来", time: 50.1 },
  { lyric: "🚄", time: 52.7, emoji: true },
  { lyric: "不規則で今日はなんだか", time: 53.25 },
  { lyric: "問題紐解けない", time: 56.95 },
  { lyric: "結構飲んだかも", time: 60.1 },
  { lyric: "目を閉じると", time: 63.0 },
  { lyric: "昨日の君がいるだけさ", time: 65.09 },
  { lyric: "😴", time: 67.7, emoji: true },
  { lyric: "なぜか軽く脳震盪", time: 69.15 },
  { lyric: "歩き方は変わらない", time: 73.9 },
  { lyric: "口説き文句", time: 77.3 },
  { lyric: "えっ？", time: 79.8 },
  { lyric: "長ったらしい", time: 80.33 },
  { lyric: "何千回だって言う", time: 82.3 },
  { lyric: "一度として狂っちゃいないはずでも", time: 85.95 },
  { lyric: "君のこと理解できない", time: 89.9 },
  { lyric: "６月中願ってたよ？", time: 93.3 },
  { lyric: "きっと目が合ってたよ", time: 97.9 },
  { lyric: "", time: 99.7 },
  { lyric: "完全に諦めたこと", time: 122.54 },
  { lyric: "あーあ　次はどこへいこう", time: 126.6 },
  { lyric: "なるべくやめたいregret", time: 130.95 },
  { lyric: "うーう", time: 134.9 },
  { lyric: "シナプス", time: 135.9 },
  { lyric: "どうしようもできない", time: 136.85 },
  { lyric: "恋へと", time: 138.84 },
  { lyric: "あーあ　これはプレゼント", time: 140.9 },
  { lyric: "なるべくやめたいregret", time: 144.9 },
  { lyric: "うーう", time: 148.9 },
  { lyric: "シナプス", time: 150.0 },
  { lyric: "発火して大問題", time: 151.0 },
  { lyric: "💥💥💥", time: 153.2, emoji: true },
  { lyric: "出来すぎで今日はなんだか", time: 153.73 },
  { lyric: "問題物足りない", time: 157.60 },
  { lyric: "結構好みかも", time: 161.08 },
  { lyric: "眼を閉じると", time: 164.0 },
  { lyric: "昨日の君がいるだけさ", time: 165.9 },
  { lyric: "ねえ", time: 169.14 },
  { lyric: "ただ", time: 170.00 },
  { lyric: "君がいるだけさ", time: 171.15 },
  { lyric: "", time: 173.5 }
];

// app.start();

window.onload = function () {
  // hack (bug iPhone viewport?)
  document.body.style.height = ( window.innerHeight || document.documentElement.clientHeight );
  window.scrollTo(0, 0);
};
