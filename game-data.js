"use strict";

/* =========================================================
   共有カードデータ（登録ページ・ゲーム共通の唯一のデータ源）

   このファイルは register.html と index.htm の両方から読み込みます。
   会社・社員の増減や名前・画像の変更は、ここだけを編集すれば
   登録ページとゲームの両方に反映されます。

   トップレベルの const は同一ページ内の後続 <script>（script.js など）
   からグローバルとして参照できます。
========================================================= */

/* -------- 会社データ --------
   colors：業績に反映されるスキルの色
     red    ：体力
     yellow ：コミュ力
     blue   ：知力
     pink   ：器用さ
*/
const COMPANY_DATA = [
  {
    id: "construction",
    name: "森の小屋工務店",
    industry: "建築",
    image: "images/company-construction.png",
    colors: ["red", "pink"]
  },
  {
    id: "education",
    name: "森の奥の動物学校",
    industry: "教育",
    image: "images/company-education.png",
    colors: ["yellow", "blue"]
  },
  {
    id: "finance",
    name: "落ち葉信用金庫",
    industry: "金融",
    image: "images/company-finance.png",
    colors: ["yellow", "blue"]
  },
  {
    id: "it",
    name: "きらきらぴこん！通信室",
    industry: "IT",
    image: "images/company-it.png",
    colors: ["pink", "blue"]
  },
  {
    id: "service",
    name: "しっぽふりふりメイドCAFE",
    industry: "接客",
    image: "images/company-service.png",
    colors: ["yellow", "red"]
  },
  {
    id: "manufacturing",
    name: "こねこね職人",
    industry: "製造",
    image: "images/company-manufacturing.png",
    colors: ["red", "pink"]
  },
  {
    id: "restaurant",
    name: "もぐもぐ工房",
    industry: "飲食",
    image: "images/company-restaurant.png",
    colors: ["yellow", "pink"]
  },
  {
    id: "clinic",
    name: "ふわふわクリニック",
    industry: "病院",
    image: "images/company-clinic.png",
    colors: ["blue", "pink"]
  }
];


/* -------- 社員データ --------
   skillsの順番
     red    ：体力
     yellow ：コミュ力
     blue   ：知力
     pink   ：器用さ
*/
const EMPLOYEE_DATA = [
  {
    id: "elephant",
    name: "ぞう",
    image: "images/employ-elephant.png",
    skills: { red: 5, yellow: 3, blue: 4, pink: 0 },
    diet: "grass",
    habitat: "land",
    parentalLeave: true,
    hibernation: false,
    disability: false,
    powerHarassment: true,
    harassmentType: "威圧指導系上司",
    personality:
      "体が大きくて、たまに仲間を蹴とばしてしまう。ぶっきらぼうで、りんごが大好き。"
  },
  {
    id: "lion",
    name: "ライオン",
    image: "images/employ-lion.png",
    skills: { red: 5, yellow: 4, blue: 3, pink: 1 },
    diet: "meat",
    habitat: "land",
    parentalLeave: true,
    hibernation: false,
    disability: false,
    powerHarassment: true,
    harassmentType: "王者マウント系オラオラ上司",
    personality:
      "統率力があるが、声が大きくて仲間を委縮させてしまう。気が強い。"
  },
  {
    id: "bear",
    name: "くま",
    image: "images/employ-bear.png",
    skills: { red: 5, yellow: 3, blue: 2, pink: 2 },
    diet: "meat",
    habitat: "land",
    parentalLeave: true,
    hibernation: true,
    disability: false,
    powerHarassment: true,
    harassmentType: "理不尽系上司",
    personality:
      "気に障ることがあるとすぐに怒る。はちみつが大好きで、たまに蜂に刺されている。"
  },
  {
    id: "penguin",
    name: "ペンギン",
    image: "images/employ-penguin.png",
    skills: { red: 2, yellow: 5, blue: 4, pink: 1 },
    diet: "meat",
    habitat: "sea",
    parentalLeave: true,
    hibernation: false,
    disability: false,
    powerHarassment: true,
    harassmentType: "お局",
    personality:
      "協調性はあるけれど給湯室のボス。結婚して子どもがいる。"
  },
  {
    id: "tuna",
    name: "マグロ",
    image: "images/employ-tuna.png",
    skills: { red: 5, yellow: 3, blue: 1, pink: 2 },
    diet: "meat",
    habitat: "sea",
    parentalLeave: false,
    hibernation: false,
    disability: false,
    powerHarassment: true,
    harassmentType: "体育会系上司",
    personality:
      "周りが見えていない。働き続ける。みんなにも、たくさん働くことを求める。"
  },
  {
    id: "dog",
    name: "犬",
    image: "images/employ-dog.png",
    skills: { red: 2, yellow: 5, blue: 3, pink: 1 },
    diet: "meat",
    habitat: "land",
    parentalLeave: true,
    hibernation: false,
    disability: false,
    powerHarassment: false,
    harassmentType: "",
    personality:
      "人懐っこく、周りに好かれる。みんなの懐に入るのが上手い。"
  },
  {
    id: "mouse",
    name: "ねずみ",
    image: "images/employ-mouse.png",
    skills: { red: 0, yellow: 5, blue: 4, pink: 3 },
    diet: "grass",
    habitat: "land",
    parentalLeave: true,
    hibernation: true,
    disability: false,
    powerHarassment: false,
    harassmentType: "",
    personality:
      "バリバリ働く頑張り屋さん。真面目な性格。"
  },
  {
    id: "chameleon",
    name: "カメレオン",
    image: "images/employ-chameleon.png",
    skills: { red: 1, yellow: 5, blue: 4, pink: 3 },
    diet: "grass",
    habitat: "land",
    parentalLeave: true,
    hibernation: false,
    disability: false,
    powerHarassment: false,
    harassmentType: "",
    personality:
      "周りと馴染むのが上手い。変化に柔軟に対応できる。"
  },
  {
    id: "octopus",
    name: "たこ",
    image: "images/employ-octopus.png",
    skills: { red: 3, yellow: 1, blue: 3, pink: 5 },
    diet: "meat",
    habitat: "sea",
    parentalLeave: true,
    hibernation: false,
    disability: false,
    powerHarassment: false,
    harassmentType: "",
    personality:
      "たくさん手があるため仕事の効率が良い。柔軟に対応できる、頼りになる社員。"
  },
  {
    id: "goat",
    name: "やぎ",
    image: "images/employ-goat.png",
    skills: { red: 3, yellow: 5, blue: 2, pink: 3 },
    diet: "grass",
    habitat: "land",
    parentalLeave: false,
    hibernation: false,
    disability: false,
    powerHarassment: false,
    harassmentType: "",
    personality:
      "気づいたら書類を食べている。でも視野が広い。"
  },
  {
    id: "cat",
    name: "ねこ",
    image: "images/employ-cat.png",
    skills: { red: 2, yellow: 3, blue: 4, pink: 3 },
    diet: "meat",
    habitat: "land",
    parentalLeave: false,
    hibernation: false,
    disability: false,
    powerHarassment: false,
    harassmentType: "",
    personality:
      "ツンデレで気まぐれ。でも愛されている。仕事をさぼって日向で昼寝している。"
  },
  {
    id: "wolf",
    name: "オオカミ",
    image: "images/employ-wolf.png",
    skills: { red: 5, yellow: 0, blue: 5, pink: 2 },
    diet: "meat",
    habitat: "land",
    parentalLeave: false,
    hibernation: true,
    disability: false,
    powerHarassment: false,
    harassmentType: "",
    personality:
      "一匹狼で、周りに馴染むのが苦手。でも真面目に仕事をする。"
  },
  {
    id: "sacabambaspis",
    name: "さかばんばすぴす",
    image: "images/employ-sacabambaspis.png",
    skills: { red: 0, yellow: 5, blue: 1, pink: 0 },
    diet: "grass",
    habitat: "sea",
    parentalLeave: false,
    hibernation: false,
    disability: false,
    powerHarassment: false,
    harassmentType: "",
    personality:
      "伸びしろがある。昔の価値観にとらわれている古い人。盆栽が趣味。"
  },
  {
    id: "owl",
    name: "ふくろう",
    image: "images/employ-owl.png",
    skills: { red: 2, yellow: 1, blue: 5, pink: 4 },
    diet: "meat",
    habitat: "land",
    parentalLeave: false,
    hibernation: false,
    disability: false,
    powerHarassment: false,
    harassmentType: "",
    personality:
      "視野が広いけれど朝が弱く、寝坊しがち。でもみんなから信頼されている。"
  },
  {
    id: "rabbit",
    name: "うさぎ",
    image: "images/employ-rabbit.png",
    skills: { red: 1, yellow: 4, blue: 2, pink: 3 },
    diet: "grass",
    habitat: "land",
    parentalLeave: true,
    hibernation: false,
    disability: false,
    powerHarassment: false,
    harassmentType: "",
    personality:
      "社内をぴょんぴょん走り回る。いつも誰かと一緒にいる。"
  },
  {
    id: "sloth",
    name: "なまけもの",
    image: "images/employ-sloth.png",
    skills: { red: 0, yellow: 2, blue: 5, pink: 2 },
    diet: "grass",
    habitat: "land",
    parentalLeave: false,
    hibernation: false,
    disability: false,
    powerHarassment: false,
    harassmentType: "",
    personality:
      "さぼりがちで休みがち。でも、みんなが気づかないミスに気づく。"
  },
  {
    id: "dolphin",
    name: "いるか",
    image: "images/employ-dolphin.png",
    skills: { red: 2, yellow: 5, blue: 5, pink: 0 },
    diet: "meat",
    habitat: "sea",
    parentalLeave: true,
    hibernation: false,
    disability: false,
    powerHarassment: false,
    harassmentType: "",
    personality:
      "頭が良いエリート。森で一番賢い大学を卒業している。声がかわいい。"
  },
  {
    id: "squid",
    name: "いか",
    image: "images/employ-squid.png",
    skills: { red: 1, yellow: 2, blue: 0, pink: 5 },
    diet: "meat",
    habitat: "sea",
    parentalLeave: false,
    hibernation: false,
    disability: false,
    powerHarassment: false,
    harassmentType: "",
    personality:
      "手が多く仕事ができるが、墨を吐いて書類を汚してしまう。"
  },
  {
    id: "crab",
    name: "かに",
    image: "images/employ-crab.png",
    skills: { red: 2, yellow: 2, blue: 2, pink: 5 },
    diet: "omnivore",
    habitat: "sea",
    parentalLeave: false,
    hibernation: false,
    disability: false,
    powerHarassment: false,
    harassmentType: "",
    personality:
      "事務作業が得意。少し頭が固い。"
  },
  {
    id: "shrimp",
    name: "えび",
    image: "images/employ-shrimp.png",
    skills: { red: 0, yellow: 4, blue: 5, pink: 2 },
    diet: "omnivore",
    habitat: "sea",
    parentalLeave: false,
    hibernation: false,
    disability: false,
    powerHarassment: false,
    harassmentType: "",
    personality:
      "高齢で、さかばんばすぴすと友達。経験と知恵は誰にも負けない。"
  },
  {
    id: "giraffe",
    name: "きりん",
    image: "images/employ-giraffe.png",
    skills: { red: 4, yellow: 1, blue: 5, pink: 2 },
    diet: "grass",
    habitat: "land",
    parentalLeave: false,
    hibernation: false,
    disability: false,
    powerHarassment: false,
    harassmentType: "",
    personality:
      "首が長すぎて会社に入れない。そのため、なかなか名前を覚えてもらえない。"
  }
];
