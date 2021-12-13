//json.js
/*
Copyright (c) 2005 JSON.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The Software shall be used for Good, not Evil.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/*
    The global object JSON contains two methods.

    JSON.stringify(value) takes a JavaScript value and produces a JSON text.
    The value must not be cyclical.

    JSON.parse(text) takes a JSON text and produces a JavaScript value. It will
    return false if there is an error.
*/
var JSON = function () {
    var m = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        s = {
            'boolean': function (x) {
                return String(x);
            },
            number: function (x) {
                return isFinite(x) ? String(x) : 'null';
            },
            string: function (x) {
                if (/["\\\x00-\x1f]/.test(x)) {
                    x = x.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                        var c = m[b];
                        if (c) {
                            return c;
                        }
                        c = b.charCodeAt();
                        return '\\u00' +
                            Math.floor(c / 16).toString(16) +
                            (c % 16).toString(16);
                    });
                }
                return '"' + x + '"';
            },
            object: function (x) {
                if (x) {
                    var a = [], b, f, i, l, v;
                    if (x instanceof Array) {
                        a[0] = '[';
                        l = x.length;
                        for (i = 0; i < l; i += 1) {
                            v = x[i];
                            f = s[typeof v];
                            if (f) {
                                v = f(v);
                                if (typeof v == 'string') {
                                    if (b) {
                                        a[a.length] = ',';
                                    }
                                    a[a.length] = v;
                                    b = true;
                                }
                            }
                        }
                        a[a.length] = ']';
                    } else if (x instanceof Object) {
                        a[0] = '{';
                        for (i in x) {
                            v = x[i];
                            f = s[typeof v];
                            if (f) {
                                v = f(v);
                                if (typeof v == 'string') {
                                    if (b) {
                                        a[a.length] = ',';
                                    }
                                    a.push(s.string(i), ':', v);
                                    b = true;
                                }
                            }
                        }
                        a[a.length] = '}';
                    } else {
                        return;
                    }
                    return a.join('');
                }
                return 'null';
            }
        };
    return {
        copyright: '(c)2005 JSON.org',
        license: 'http://www.crockford.com/JSON/license.html',
		/*
		    Stringify a JavaScript value, producing a JSON text.
		*/
        stringify: function (v) {
            var f = s[typeof v];
            if (f) {
                v = f(v);
                if (typeof v == 'string') {
                    return v;
                }
            }
            return null;
        },
		/*
		    Parse a JSON text, producing a JavaScript value.
		    It returns false if there is a syntax error.
		*/
        parse: function (text) {
            try {
                return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
                        text.replace(/"(\\.|[^"\\])*"/g, ''))) &&
                    eval('(' + text + ')');
            } catch (e) {
                return false;
            }
        }
    };
}();

// --calendarObj.js


//日期资料


var lunarInfo=new Array(
0x4bd8,0x4ae0,0xa570,0x54d5,0xd260,0xd950,0x5554,0x56af,0x9ad0,0x55d2,
0x4ae0,0xa5b6,0xa4d0,0xd250,0xd295,0xb54f,0xd6a0,0xada2,0x95b0,0x4977,
0x497f,0xa4b0,0xb4b5,0x6a50,0x6d40,0xab54,0x2b6f,0x9570,0x52f2,0x4970,
0x6566,0xd4a0,0xea50,0x6a95,0x5adf,0x2b60,0x86e3,0x92ef,0xc8d7,0xc95f,
0xd4a0,0xd8a6,0xb55f,0x56a0,0xa5b4,0x25df,0x92d0,0xd2b2,0xa950,0xb557,
0x6ca0,0xb550,0x5355,0x4daf,0xa5b0,0x4573,0x52bf,0xa9a8,0xe950,0x6aa0,
0xaea6,0xab50,0x4b60,0xaae4,0xa570,0x5260,0xf263,0xd950,0x5b57,0x56a0,
0x96d0,0x4dd5,0x4ad0,0xa4d0,0xd4d4,0xd250,0xd558,0xb540,0xb6a0,0x95a6,
0x95bf,0x49b0,0xa974,0xa4b0,0xb27a,0x6a50,0x6d40,0xaf46,0xab60,0x9570,
0x4af5,0x4970,0x64b0,0x74a3,0xea50,0x6b58,0x5ac0,0xab60,0x96d5,0x92e0,
0xc960,0xd954,0xd4a0,0xda50,0x7552,0x56a0,0xabb7,0x25d0,0x92d0,0xcab5,
0xa950,0xb4a0,0xbaa4,0xad50,0x55d9,0x4ba0,0xa5b0,0x5176,0x52bf,0xa930,
0x7954,0x6aa0,0xad50,0x5b52,0x4b60,0xa6e6,0xa4e0,0xd260,0xea65,0xd530,
0x5aa0,0x76a3,0x96d0,0x4afb,0x4ad0,0xa4d0,0xd0b6,0xd25f,0xd520,0xdd45,
0xb5a0,0x56d0,0x55b2,0x49b0,0xa577,0xa4b0,0xaa50,0xb255,0x6d2f,0xada0,
0x4b63,0x937f,0x49f8,0x4970,0x64b0,0x68a6,0xea5f,0x6b20,0xa6c4,0xaaef,
0x92e0,0xd2e3,0xc960,0xd557,0xd4a0,0xda50,0x5d55,0x56a0,0xa6d0,0x55d4,
0x52d0,0xa9b8,0xa950,0xb4a0,0xb6a6,0xad50,0x55a0,0xaba4,0xa5b0,0x52b0,
0xb273,0x6930,0x7337,0x6aa0,0xad50,0x4b55,0x4b6f,0xa570,0x54e4,0xd260,
0xe968,0xd520,0xdaa0,0x6aa6,0x56df,0x4ae0,0xa9d4,0xa4d0,0xd150,0xf252,
0xd520);

var solarMonth=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
var Gan=new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸");
var Zhi=new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");
var Animals=new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");
var solarTerm = new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至");
var sTermInfo = new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758);
var nStr1 = new Array('日','一','二','三','四','五','六','七','八','九','十');
var nStr2 = new Array('初','十','廿','卅','□');
var monthName = new Array("JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC");
var cmonthName = new Array('正','二','三','四','五','六','七','八','九','十','十一','腊');
//jieqiJson.y2015 = [6,20,4,19,6,21,5,20,5,21,6,21,7,23,7,23,8,23,8,23,7,22,7,22];
//公历节日 *表示放假日
var sFtv = new Array(
"0101*元旦",
"0210 气象节",
"0214 情人节",
"0303 爱耳日",
"0308 妇女节",
"0312 植树节",
"0314 国际警察节",
"0315 国际消费者权益日",
"0323 世界气象日",
"0401 愚人节",
"0422 地球日",
"0501 劳动节",
"0512 护士节",
"0515 国际家庭日",
"0519 中国旅游日",
"0504 青年节",
"0531 无烟日", 
"0601 儿童节",
"0605 世界环境日",
"0626 国际反毒品日",
//"0606 爱眼日",
"0701 建党日",
"0707 七七事变",
"0711 中国航海日",
"0801 建军节",
"0815 日本投降日",
"0903 抗战胜利日",
"0920 爱牙日",
"0930 烈士纪念日",
"0910 教师节",
"0918 九·一八事变纪念日",
"1001*国庆节",
"1031 万圣节",
"1016 世界粮食日",
"1108 记者节",
"1111 光棍节",
"1117 国际大学生节",
"1201 艾滋病日",
"1210 世界人权日",
"1213 南京大屠杀纪念日",
"1220 澳门回归纪念日",
"1224 平安夜",
"1225 圣诞节");

//某月的第几个星期几。 5,6,7,8 表示到数第 1,2,3,4 个星期几
var wFtv = new Array(
//一月的最后一个星期日（月倒数第一个星期日）
"0520 母亲节",
"0630 父亲节",
"1144 感恩节");

//农历节日
var lFtv = new Array(
"0101*春节",
"0115 元宵节",
"0202 龙抬头",
"0505 端午节",
"0707 七夕",
"0715 中元节",
"0815 中秋节",
"0909 重阳节",
"1208 腊八节",
"1223 北方小年",
"1224 南方小年",
"0100*除夕");


/*****************************************************************************
                                      日期计算
*****************************************************************************/

//====================================== 返回农历 y年的总天数
function lYearDays(y) {
 var i, sum = 348;
 for(i=0x8000; i>0x8; i>>=1) sum += (lunarInfo[y-1900] & i)? 1: 0;
 return(sum+leapDays(y));
}

//====================================== 返回农历 y年闰月的天数
function leapDays(y) {
 if(leapMonth(y)) return( (lunarInfo[y-1899]&0xf)==0xf? 30: 29);
 else return(0);
}

//====================================== 返回农历 y年闰哪个月 1-12 , 没闰返回 0
function leapMonth(y) {
 var lm = lunarInfo[y-1900] & 0xf;
 return(lm==0xf?0:lm);
}

//====================================== 返回农历 y年m月的总天数
function monthDays(y,m) {
 return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
}



//====================================== 算出农历, 传入日期控件, 返回农历日期控件
//                                       该控件属性有 .year .month .day .isLeap
function Lunar(objDate) {

   var i, leap=0, temp=0;
   var offset   = (Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate()) - Date.UTC(1900,0,31))/86400000;

   for(i=1900; i<2100 && offset>0; i++) { temp=lYearDays(i); offset-=temp; }

   if(offset<0) { offset+=temp; i--; }

   this.year = i;

   leap = leapMonth(i); //闰哪个月
   this.isLeap = false;

   for(i=1; i<13 && offset>0; i++) {
      //闰月
      if(leap>0 && i==(leap+1) && this.isLeap==false)
         { --i; this.isLeap = true; temp = leapDays(this.year); }
      else
         { temp = monthDays(this.year, i); }

      //解除闰月
      if(this.isLeap==true && i==(leap+1)) this.isLeap = false;

      offset -= temp;
   }

   if(offset==0 && leap>0 && i==leap+1)
      if(this.isLeap)
         { this.isLeap = false; }
      else
         { this.isLeap = true; --i; }

   if(offset<0){ offset += temp; --i; }

   this.month = i;
   this.day = offset + 1;
}

function getSolarDate(lyear, lmonth, lday, isLeap) {
  var offset = 0;
  
  // increment year
  for(var i = 1900; i < lyear; i++) {
    offset += lYearDays(i);
  }

  // increment month
  // add days in all months up to the current month
  for (var i = 1; i < lmonth; i++) {
    // add extra days for leap month
    if (i == leapMonth(lyear)) {
      offset += leapDays(lyear);
    }
    offset += monthDays(lyear, i);
  }
  // if current month is leap month, add days in normal month
  if (isLeap) {
    offset += monthDays(lyear, i);
  }
   
  // increment 
  offset += parseInt(lday) - 1;

  var baseDate = new Date(1900,0,31);
  var solarDate = new Date(baseDate.valueOf() + offset * 86400000);
  return solarDate;
}


//==============================返回公历 y年某m+1月的天数
function solarDays(y,m) {
   if(m==1)
      return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
   else
      return(solarMonth[m]);
}

//============================== 传入 offset 返回干支, 0=甲子
function cyclical(num) {
   return(Gan[num%10]+Zhi[num%12]);
}


//============================== 阴历属性
function calElement(sYear,sMonth,sDay,week,lYear,lMonth,lDay,isLeap,cYear,cMonth,cDay,cMnum,cDnum) {

      this.isToday    = false;
      //瓣句
      this.sYear      = sYear;   //公元年4位数字
      this.sMonth     = sMonth;  //公元月数字
      this.sDay       = sDay;    //公元日数字
      this.week       = week;    //星期, 1个中文
      //农历
      this.lYear      = lYear;   //公元年4位数字
      this.lMonth     = lMonth;  //农历月数字
      this.lDay       = lDay;    //农历日数字
      this.isLeap     = isLeap;  //是否为农历闰月?
      //八字
      this.cYear      = cYear;   //年柱, 2个中文
      this.cMonth     = cMonth;  //月柱, 2个中文
      this.cDay       = cDay;    //日柱, 2个中文

      this.color      = '';

      this.lunarFestival = ''; //农历节日
      this.solarFestival = ''; //公历节日
      this.solarTerms    = ''; //节气
      
      this.cMnumber=cMnum;
      this.cDnumber=cDnum;
}

//===== 某年的第n个节气为几日(从0小寒起算)
function sTerm(y,n) {
	if(!!jieqiJson["y"+y])
		return jieqiJson["y"+y][n];
   var offDate = new Date( ( 31556925974.7*(y-1900) + sTermInfo[n]*60000  ) + Date.UTC(1900,0,6,2,5) );
   return(offDate.getDate());
}





//============================== 返回阴历控件 (y年,m+1月)
/*
功能说明: 返回整个月的日期资料控件

使用方式: OBJ = new calendar(年,零起算月);

  OBJ.length      返回当月最大日
  OBJ.firstWeek   返回当月一日星期

  由 OBJ[日期].属性名称 即可取得各项值

  OBJ[日期].isToday  返回是否为今日 true 或 false

  其他 OBJ[日期] 属性参见 calElement() 中的注解
*/
function calendar(y,m) {

   var sDObj, lDObj, lY, lM, lD=1, lL, lX=0, tmp1, tmp2, tmp3;
   var cY, cM, cD; //年柱,月柱,日柱
   var lDPOS = new Array(3);
   var n = 0;
   var firstLM = 0;

   sDObj = new Date(y,m,1,0,0,0,0);    //当月一日日期

   this.length    = solarDays(y,m);    //公历当月天数
   this.firstWeek = sDObj.getDay();    //公历当月1日星期几

   ////////年柱 1900年立春后为庚子年(60进制36)
   if(m<2) cY=cyclical(y-1900+36-1); //当m为1时，应计算前一年的阴历
   else cY=cyclical(y-1900+36);
   var term2=sTerm(y,2); //立春日期

   ////////月柱 1900年1月小寒以前为 丙子月(60进制12)
   var firstNode = sTerm(y,m*2); //返回当月「节」为几日开始
   
   var cMnum=(y-1900)*12+m+12;
   
   cM = cyclical(cMnum);
   
   //当月一日与 1900/1/1 相差天数
   //1900/1/1与 1970/1/1 相差25567日, 1900/1/1 日柱为甲戌日(60进制10)
   var dayCyclical = Date.UTC(y,m,1,0,0,0,0)/86400000+25567+10;

   for(var i=0;i<this.length;i++) {

      if(lD>lX) {
         sDObj = new Date(y,m,i+1);    //当月一日日期
         lDObj = new Lunar(sDObj);     //农历
         lY    = lDObj.year;           //农历年
         lM    = lDObj.month;          //农历月
         lD    = lDObj.day;            //农历日
         lL    = lDObj.isLeap;         //农历是否闰月
         lX    = lL? leapDays(lY): monthDays(lY,lM); //农历当月最后一天

         if(n==0) firstLM = lM;
         lDPOS[n++] = i-lD+1;
      }

      //依节气调整二月分的年柱, 以立春为界
      if(m==1 && (i+1)==term2) cY=cyclical(y-1900+36);
      //依节气月柱, 以「节」为界
      if((i+1)==firstNode) cM = cyclical((y-1900)*12+m+13);
      //日柱
      var cDnum=dayCyclical+i;
      if((i+1)>=firstNode){
    	  cMnum=(y-1900)*12+m+13;
      }
      cD = cyclical(cDnum);

      
      //sYear,sMonth,sDay,week,
      //lYear,lMonth,lDay,isLeap,
      //cYear,cMonth,cDay
      
      this[i] = new calElement(y, m+1, i+1, nStr1[(i+this.firstWeek)%7],
                               lY, lM, lD++, lL,
                               cY ,cM, cD,cMnum,cDnum);
   }

   //节气
   tmp1=sTerm(y,m*2  )-1;
   tmp2=sTerm(y,m*2+1)-1;
   this[tmp1].solarTerms = solarTerm[m*2];
   this[tmp2].solarTerms = solarTerm[m*2+1];
   //if(m==3) this[tmp1].color = 'red'; //清明颜色

   //公历节日
   for(var i= 0; i < sFtv.length ; i++){
      if(sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
         if(Number(RegExp.$1)==(m+1)) {
            this[Number(RegExp.$2)-1].solarFestival += RegExp.$4 + ' ';
            if(RegExp.$3=='*') this[Number(RegExp.$2)-1].color = 'red';
         }
   }
   //月周节日
   for(var i=0;i < wFtv.length;i++)
      if(wFtv[i].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/))
         if(Number(RegExp.$1)==(m+1)) {
            tmp1=Number(RegExp.$2);
            tmp2=Number(RegExp.$3);
            if(tmp1<5)
               this[((this.firstWeek>tmp2)?7:0) + 7*(tmp1-1) + tmp2 - this.firstWeek].solarFestival += RegExp.$5 + ' ';
            else {
               tmp1 -= 5;
               tmp3 = (this.firstWeek+this.length-1)%7; //当月最后一天星期?
               this[this.length - tmp3 - 7*tmp1 + tmp2 - (tmp2>tmp3?7:0) - 1 ].solarFestival += RegExp.$5 + ' ';
            }
         }

   //农历节日
   for(var i=0;i < lFtv.length;i++)
      if(lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
         tmp1=Number(RegExp.$1)-firstLM;
         if(tmp1==-11) tmp1=1;
         if(tmp1 >=0 && tmp1<n) {
            tmp2 = lDPOS[tmp1] + Number(RegExp.$2) -1;
            if( tmp2 >= 0 && tmp2<this.length && this[tmp2].isLeap!=true) {
               this[tmp2].lunarFestival += RegExp.$4 + ' ';
               if(RegExp.$3=='*') this[tmp2].color = 'red';
            }
         }
      }


   //复活节只出现在3或4月
//  if(m==2 || m==3) {
//      var estDay = new easter(y);
//      if(m == estDay.m)
//         this[estDay.d-1].solarFestival = this[estDay.d-1].solarFestival+' 复活节 Easter Sunday';
//   }

   //黑色星期五
//	if((this.firstWeek+12)%7==5)
//      this[12].solarFestival += '黑色星期五';

   //今日
   //if(y==g_tY && m==g_tM) {this[g_tD-1].isToday = true;}

}




//======================================= 返回该年的复活节(春分后第一次满月周后的第一主日)
function easter(y) {

   var term2=sTerm(y,5); //取得春分日期
   var dayTerm2 = new Date(Date.UTC(y,2,term2,0,0,0,0)); //取得春分的公历日期控件(春分一定出现在3月)
   var lDayTerm2 = new Lunar(dayTerm2); //取得取得春分农历

   if(lDayTerm2.day<15) //取得下个月圆的相差天数
      var lMlen= 15-lDayTerm2.day;
   else
      var lMlen= (lDayTerm2.isLeap? leapDays(y): monthDays(y,lDayTerm2.month)) - lDayTerm2.day + 15;

   //一天等于 1000*60*60*24 = 86400000 毫秒
   var l15 = new Date(dayTerm2.getTime() + 86400000*lMlen ); //求出第一次月圆为公历几日
   var dayEaster = new Date(l15.getTime() + 86400000*( 7-l15.getUTCDay() ) ); //求出下个周日

   this.m = dayEaster.getUTCMonth();
   this.d = dayEaster.getUTCDate();

}

//====================== 中文日期//农历日期
function cDay(d){
   var s;
   switch (d) {
      case 10:
         s = '初十'; break;
      case 20:
         s = '二十'; break;
         break;
      case 30:
         s = '三十'; break;
         break;
      default :
         s = nStr2[Math.floor(d/10)];
         s += nStr1[d%10];
   }
   return(s);
}

var worktime = {};
//--workTime.js
worktime.years= [2011,2012,2013,2014];
worktime.y2011 = JSON.parse('{"d0402":{"w":"班"},"d0403":{"w":"假"},"d0404":{"w":"假"},"d0405":{"w":"假"},"d0430":{"w":"假"},"d0501":{"w":"假"},"d0502":{"w":"假"},"d0604":{"w":"假"},"d0605":{"w":"假"},"d0606":{"w":"假"},"d0910":{"w":"假"},"d0911":{"w":"假"},"d0912":{"w":"假"},"d1001":{"w":"假"},"d1002":{"w":"假"},"d1003":{"w":"假"},"d1004":{"w":"假"},"d1005":{"w":"假"},"d1006":{"w":"假"},"d1007":{"w":"假"},"d1008":{"w":"班"},"d1009":{"w":"班"},"d1231":{"w":"班"}}');
worktime.y2011.workRestStr = 'd0402 d0403 d0404 d0405 d0430 d0501 d0502 d0604 d0605 d0606 d0910 d0911 d0912 d1001 d1002 d1003 d1004 d1005 d1006 d1007 d1008 d1009 d1231';
worktime.y2012 = JSON.parse('{"d0101":{"w":"假"},"d0102":{"w":"假"},"d0103":{"w":"假"},"d0121":{"w":"班"},"d0122":{"w":"假"},"d0123":{"w":"假"},"d0124":{"w":"假"},"d0125":{"w":"假"},"d0126":{"w":"假"},"d0127":{"w":"假"},"d0128":{"w":"假"},"d0129":{"w":"班"},"d0331":{"w":"班"},"d0401":{"w":"班"},"d0402":{"w":"假"},"d0403":{"w":"假"},"d0404":{"w":"假"},"d0428":{"w":"班"},"d0429":{"w":"假"},"d0430":{"w":"假"},"d0501":{"w":"假"},"d0622":{"w":"假"},"d0623":{"w":"假"},"d0624":{"w":"假"},"d0929":{"w":"班"},"d0930":{"w":"假"},"d1001":{"w":"假"},"d1002":{"w":"假"},"d1003":{"w":"假"},"d1004":{"w":"假"},"d1005":{"w":"假"},"d1006":{"w":"假"},"d1007":{"w":"假"}}');
worktime.y2012.workRestStr = 'd0101 d0102 d0103 d0121 d0122 d0123 d0124 d0125 d0126 d0127 d0128 d0129 d0331 d0401 d0402 d0403 d0404 d0428 d0429 d0430 d0501 d0622 d0623 d0624 d0929 d0930 d1001 d1002 d1003 d1004 d1005 d1006 d1007';
//
worktime.y2013 = JSON.parse('{"d0101":{"w":"假"},"d0102":{"w":"假"},"d0103":{"w":"假"},"d0105":{"w":"班"},"d0106":{"w":"班"},"d0209":{"w":"假"},"d0210":{"w":"假"},"d0211":{"w":"假"},"d0212":{"w":"假"},"d0213":{"w":"假"},"d0214":{"w":"假"},"d0215":{"w":"假"},"d0216":{"w":"班"},"d0217":{"w":"班"},"d0404":{"w":"假"},"d0405":{"w":"假"},"d0406":{"w":"假"},"d0407":{"w":"班"},"d0427":{"w":"班"},"d0428":{"w":"班"},"d0429":{"w":"假"},"d0430":{"w":"假"},"d0501":{"w":"假"},"d0608":{"w":"班"},"d0609":{"w":"班"},"d0610":{"w":"假"},"d0611":{"w":"假"},"d0612":{"w":"假"},"d0919":{"w":"假"},"d0920":{"w":"假"},"d0921":{"w":"假"},"d0922":{"w":"班"},"d0929":{"w":"班"},"d1001":{"w":"假"},"d1002":{"w":"假"},"d1003":{"w":"假"},"d1004":{"w":"假"},"d1005":{"w":"假"},"d1006":{"w":"假"},"d1007":{"w":"假"},"d1012":{"w":"班"}}');
worktime.y2013.workRestStr = 'd0101 d0102 d0103 d0105 d0106 d0209 d0210 d0211 d0212 d0213 d0214 d0215 d0216 d0217 d0404 d0405 d0406 d0407 d0427 d0428 d0429 d0430 d0501 d0608 d0609 d0610 d0611 d0612 d0919 d0920 d0921 d0922 d0929 d1001 d1002 d1003 d1004 d1005 d1006 d1007 d1012';
//
//worktime.y2014 = JSON.parse('{"d0101":{"w":"假"},"d0126":{"w":"班"},"d0131":{"w":"假"},"d0201":{"w":"假"},"d0202":{"w":"假"},"d0203":{"w":"假"},"d0204":{"w":"假"},"d0205":{"w":"假"},"d0206":{"w":"假"},"d0208":{"w":"班"},"d0405":{"w":"假"},"d0406":{"w":"假"},"d0407":{"w":"假"},"d0501":{"w":"假"},"d0502":{"w":"假"},"d0503":{"w":"假"},"d0504":{"w":"班"},"d0602":{"w":"假"},"d0908":{"w":"假"},"d0928":{"w":"班"},"d1001":{"w":"假"},"d1002":{"w":"假"},"d1003":{"w":"假"},"d1004":{"w":"假"},"d1005":{"w":"假"},"d1006":{"w":"假"},"d1007":{"w":"假"},"d1011":{"w":"班"}}');
//worktime.y2014.workRestStr = 'd0101 d0126 d0131 d0201 d0202 d0203 d0204 d0205 d0206 d0208 d0405 d0406 d0407 d0501 d0502 d0503 d0504 d0602 d0908 d0928 d1001 d1002 d1003 d1004 d1005 d1006 d1007 d1011';
//

$.ajax({
	url: "http://static.etouch.cn/apis/holiday-in-law.jsonp",
	dataType: "jsonp",
	jsonp: "aaa"
});
function cbreturn(data){
	var cnArr = data.holidays.cn;
	for(var i=0;i<cnArr.length;i++){
		var year = cnArr[i].date.toString().substr(0,4);
		var yyearJson = worktime["y"+year];
		if(!!yyearJson){
			yyearJson["workRestStr"] += "d"+cnArr[i].date.toString().replace(year,"")+" ";
			if(cnArr[i].status == 0){
				yyearJson["d"+cnArr[i].date.toString().replace(year,"")] = {"w":"假"}
			}else{
				yyearJson["d"+cnArr[i].date.toString().replace(year,"")] = {"w":"班"}
			}
		}else{
			worktime.years.push(year);
			worktime["y"+year] = {};
			yyearJson = worktime["y"+year];
			yyearJson["workRestStr"] = "d"+cnArr[i].date.toString().replace(year,"")+" ";
			if(cnArr[i].status == 0){
				yyearJson["d"+cnArr[i].date.toString().replace(year,"")] = {"w":"假"}
			}else{
				yyearJson["d"+cnArr[i].date.toString().replace(year,"")] = {"w":"班"}
			}
		}
	}
	//
	calander.init();
}

var jieqiJson = {}
//var solarTerm = new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至");
jieqiJson.y2015 = [6,20,4,19,6,21,5,20,6,21,6,22,7,23,8,23,8,23,8,24,8,22,7,22];
jieqiJson.y2014 = [5,20,4,19,6,21,5,20,5,21,6,21,7,23,7,23,8,23,8,23,7,22,7,22];
jieqiJson.y2013 = [5,20,4,18,5,20,4,20,5,21,5,21,7,22,7,23,7,23,8,23,7,22,7,22];


/*var festival_main = {
	"2012_01_01":"元旦",
	"2012_01_23":"春节" ,
	"2012_04_04":"清明节" ,
	"2012_05_01":"劳动节" ,
	"2012_06_23":"端午节",
	"2012_09_30":"中秋节",
	"2012_10_01":"国庆节"
};*/
//var qmj = "2013/04/0" + sTerm(new Date().getFullYear(),6);
/*var festival_main = {
	"2013/01/01":"元旦",
	"*2013/01/01":"春节",
	"2013/04/04":"清明节" ,
	"2013/05/01":"劳动节" ,
	"*2013/05/05":"端午节",
	"*2013/08/15":"中秋节",
	"2013/10/01":"国庆节"
};*/
var festival_main = {
	"2015/01/01":"元旦",
	"2015/02/19":"春节",
	"2015/04/05":"清明节" ,
	"2015/05/01":"劳动节" ,
	"2015/06/20":"端午节",
	"2015/09/27":"中秋节",
	"2015/10/01":"国庆节"
};



/*if(!festival_main[qmj]){
	delete festival_main["2013/04/04"];
	festival_main[qmj]="清明节";
}*/

//--common.js
/*======================一些公共的方法========================*/
$.dom = function(elementId) {
    return document.getElementById(elementId);
};

//设置stringBuffer
function StringBuffer() {
    this._strings = new Array();
};

StringBuffer.prototype.append = function(str) {
    this._strings.push(str);
    return this;
};

StringBuffer.prototype.toString = function() {
    var str = arguments.length == 0 ? '' : arguments[0];
    return this._strings.join(str);
};

String.prototype.leftpad = function(len, str) {
    if (!str) {
        str = '0';
    }

    var s = '';
    for (var i = 0; i < len - this.length; i++) {
        s += str;
    }
    return s + this;
};

String.prototype.htmlspecialchars = function(){
	//return this.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&acute;").replace(/&/g, "&amp;");
	return this;
};

function getMonthKey(year, month) { // 传入的month为0-11的数值 -> (1->01,2->02...11->11)
    return year.toString() + (month + 1).toString().leftpad(2); // 返回yyyyMM格式的字符串
}

function getDateKey(date) {
    return date.getFullYear().toString() +"-"+(date.getMonth() + 1).toString().leftpad(2)+"-"+date.getDate().toString().leftpad(2); // 返回yyyy-MM-dd格式的字符串
}
function is_leap_year(cur_year){  //判断年份是否为闰年，是则返回1，否则返回0
	 if(cur_year % 400 == 0 || (cur_year % 100 !=0 && cur_year % 4 == 0)) return 1;
	 return 0;
}

function getDaysByMonth(date){
	var days = [[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	            [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]];
	return days[is_leap_year(date.getFullYear())][date.getMonth()];
}

function dateDiff(now, date){
	var diff = dateDiffDays(now, date);
	if(diff == 0) return "今天";
	else if(diff < 0) return (0-diff) + "天前";
	else return diff + "天后";
}

function dateDiffDays(now, date){
	var n = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	var diff = parseInt((d - n)/(24 * 60 * 60 * 1000));
	return diff;
}
  
/*==========================utils.js========================*/
var utils = {
    getEvent : function(ev) {
        return window.event ? window.event : (ev ? ev : null);
    },
    getMousePosition : function(ev) {
        var evt = this.getEvent(ev);
        if (evt.pageX || evt.pageY) {
            return {
                x : evt.pageX,
                y : evt.pageY
            };
        }
        return {
            x : evt.clientX + document.documentElement.scrollLeft
            - document.documentElement.clientLeft,
            y : evt.clientY + document.documentElement.scrollTop
            - document.documentElement.clientTop
        };
    },
    getClientWidth : function() {
        return $.browser.msie ? ieBody.clientWidth : window.innerWidth;
    },
    getClientHeight : function() {
        return $.browser.msie ? ieBody.clientHeight : window.innerHeight;
    },
	getRandomColor : function() {
		/*
		 * 
		 * getRandomColor 从colors数组获取随机颜色
		 * 
		 * @return 对象,index:索引,value:颜色代码
		 * 
		 */
		var index = Math.round(Math.random() * (colors.length - 1));
		return {
			index : index,
			value : colors[index]
		};
	},
    /*
     * obj : DOM element
     */
    getOffsetXY : function(obj, parentId) {
        /*
         *
         * getOffsetXY 获取相对坐标
         *
         * @param obj id或者dom对象 @param parentId 父级id，如果不提供则为body
         *
         * @return 坐标对象，x、y
         *
         */
//        var element;
//        if (typeof obj == 'object') {
//            element = obj;
//        } else {
//            element = document.getElementById(obj);
//        }
//        var element_X = element.offsetLeft;
//        var element_Y = element.offsetTop;
//        while (true) {
//            if ((!element.offsetParent) || (!element.offsetParent.style)
//            || (!!parentId && element.offsetParent.id == parentId)) {
//                break;
//            }
//            element_X += element.offsetParent.offsetLeft;
//            element_Y += element.offsetParent.offsetTop;
//            element = element.offsetParent;
//        }
//        element_X = element_X - document.body.scrollLeft;
//        element_Y = element_Y - document.body.scrollTop;
//
//        return {
//            x : element_X,
//            y : element_Y
//        };
        var pos= {};
        if(parentId) {
            pos = $(obj).position();
            return {
                x : pos.left,
                y : pos.top
            };
        }
        pos = $(obj).offset();
        return {
            x : pos.left,
            y : pos.top
        };
    },
	hideDialog:function(id){
		for(var i=0;i<id.length;i++)
		{
			$("#"+id[i]).hide();
			$(document).unbind("mousedown."+id[i]);
		}
	},
    mousedown_hide_ele : function(id,parent_id,descard_id) {   // 实现鼠标点击其他地方，关闭对话框，

        $(document).bind("mousedown."+id, function(r) {
            var p = r.target;
            var q = document.getElementById(id);
            while (true) {
                if (p == q) {
                    return true;
                } else {
                    try {
                        if (p.id == parent_id) {     // 此处需要修改，有的情况下会出现脚本停止响应的现象(p == document)
                            $(document).unbind("mousedown."+id);
                            $("#"+id).hide();
                            return false;
                        } else {
							if(p.id==descard_id){
								return;
							}
                            p = $(p).parent()[0];
                        }
                    } catch(e) {
                        return false;
                    }
                }
            }
        });
    }
};
/*==============cacheMgr,在calwnl中用到===============*/
var cacheMgr = {
    cldCache : {}, // 注意！这里存的是calendarObj.js中定义的calendar对象，不是数据文件载入的cldObj
    getCld : function(year, month) {
        var key = getMonthKey(year, month);
        var cld = this.cldCache[key];
        if (typeof cld == 'undefined') {
            cld = new calendar(year, month);
            this.cldCache[key] = cld;
        }
        return cld;
    }
};

/*==========================时间处理===========================*/
/*
 %e  Day of the month without leading zeros (01..31)
 %d  Day of the month, 2 digits with leading zeros (01..31)
 %j  Day of the year, 3 digits with leading zeros (001..366)
 %a  A textual representation of a day, two letters
 %W  A full textual representation of the day of the week

 %c  Numeric representation of a month, without leading zeros (0..12)
 %m  Numeric representation of a month, with leading zeros (00..12)
 %b  A short textual representation of a month, three letters (Jan..Dec)
 %M  A full textual representation of a month, such as January or March (January..December)

 %y  A two digit representation of a year (93..03)
 %Y  A full numeric representation of a year, 4 digits (1993..03)
 */
var calwnl = {};
calwnl.date= {
    date_part: function(date) { //返回当前时间的日期部分，时间部分则全为零（Mon Jun 18 2012 14:18:46 GMT+0800 为 Mon Jun 18 2012 00:00:00 GMT+0800 ）
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    },
    month_day : function(date) {  //从 Date 对象返回一个月中的某一天 (1 ~ 31)。
        var d = date || new Date();
        return d.getDate();
    },
    time_part: function(date) { //获取这个时间点，在当天的秒数（ 如：14:18:16 转换成秒数为51526.47199988365 小数点后面的为毫秒尾数）
        return (date.valueOf()/1000 - date.getTimezoneOffset()*60)%86400;
    },
    week_start: function(date,start_on_monday) { //此方法是设设置本星期的起始是哪一天,即本星期一是本月哪一天（返回值：Date）
        var shift=date.getDay();  //此方法的目的是，获取当前日期所在星期中星期一是哪个日期
        if (start_on_monday) {
            if (shift==0)
                shift=6;
            else
                shift--;
        }//从 Date 对象返回一周中的某一天 (0 ~ 6)。start_on_monday为ture时 0-6 表示为从星期一到星期日
        return this.date_part(this.add(date,-1*shift,"day"));
    },
    month_start: function(date) {  //方法返回的是一个时间为零，日期为本月的第一天的Date对象。（目的返回本月的第一天）
        date.setDate(1);
        return this.date_part(date);
    },
    month_view_start : function(date, start_on_monday) {   //返回月初即月的1号，所在的星期的星期一是哪一天
        return this.week_start(this.month_start(date), start_on_monday);
    },
    year_start: function(date) {  //返回本年的第一天（{Mon Jun 18 2012 00:18:46 GMT+0800} 会转化为 {Sun Jan 01 2012 00:18:46 GMT+0800} ** 注意一点哦，星期回随着时间的变化而发生变化哦~）
        date.setMonth(0);
        return this.month_start(date);
    },
    day_start: function(date) {
        return this.date_part(date);
    },
    add: function(date,inc,mode) {  //
        var ndate=new Date(date.valueOf());
        switch(mode) {
            case "day":  //设置本星期的起始是哪一天,即本星期一是本月哪一天
                ndate.setDate(ndate.getDate()+inc);
                break;
            case "week":
                ndate.setDate(ndate.getDate()+7*inc);
                break;
            case "month":
                ndate.setMonth(ndate.getMonth()+inc);
                break;
            case "year":
                ndate.setYear(ndate.getFullYear()+inc);
                break;
            case "hour":
                ndate.setHours(ndate.getHours()+inc);
                break;
            case "minute":
                ndate.setMinutes(ndate.getMinutes()+inc);
                break;
            default:
                return defaults.date["add_"+mode](date,inc,mode);
        }
        return ndate;
    },
    to_fixed: function(num) {  //1->01,5->05...10->10
        if (num<10)
            return "0"+num;
        return num;
    },
    copy: function(date) {  // 获取时间的副本
        return new Date(date.valueOf());
    },
    getChinaNum : function(Num) {  //农历的每月开头
        var monthEn;
        switch(Num) {
            case 1 :
                monthEn = "一";
                break;
            case 2 :
                monthEn = "二";
                break;
            case 3 :
                monthEn = "三";
                break;
            case 4 :
                monthEn = "四";
                break;
            case 5 :
                monthEn = "五";
                break;
            case 6 :
                monthEn = "六";
                break;
            case 7 :
                monthEn = "七";
                break;
            case 8 :
                monthEn = "八";
                break;
            case 9 :
                monthEn = "九";
                break;
            case 10 :
                monthEn = "十";
                break;
            case 11 :
                monthEn = "十一";
                break;
            case 12 :
                monthEn = "腊";
                break;
        }
        return monthEn;
    },
    getLundarMD : function(md,split){
    	var month='';
    	var day='';
    	if(!split){
    		month = md.substr(0,2);
    		day = md.substr(2,2);
    	}else{
    		var arr = md.split(split);
    		month = arr[0];
    		day = arr[1];
    	}
    	return this.getChinaNum(parseFloat(month))+"月"+cDay(parseFloat(day));
    	
    },
    getDayNameBrief: function(day_index) {
        var day_name = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
        return day_name[day_index];
    },
    daynameToIndex: function(dayname) {
    	var dayname_index_map = {'SUN':0,'MON':1,'TUE':2,'WED':3,'THU':4,'FRI':5,'SAT':6};
    	return dayname_index_map[dayname];
    },
    /*
     * date_time所在日期为当月第几周
     */
    getWeekOfMonth: function(date_time, start_on_monday) {
        var date = this.copy(date_time);
        return Math.floor((this.date_part(date).getTime() - this.month_view_start(date, start_on_monday).getTime())/604800000) + 1;
    },
    lunar_year : function(date) {  //获取阴历年份的名称 { 2012 -> 辛卯年【兔年】 } 
        var l_year = date.getFullYear()+'年'+(date.getMonth()+1)+'月 '+cyclical(date.getFullYear() - 1900 + 36) + Animals[(date.getFullYear() - 4) % 12] + '年';
        return l_year;
    },
    lunar_Info : function(date) {

        var cld = cacheMgr.getCld(date.getFullYear(), date.getMonth());
        var day = date.getDate();
        var cld_day = cld[day - 1];
        var lunar_detail = {
            l_day : "",
            l_month : "",
            l_day_full:""
        };
        lunar_detail.l_day = cDay(cld_day.lDay);
        lunar_detail.l_month = cld_day.lMonth;
        lunar_detail.color = "";
        var s,s2;
        s=cld_day.lunarFestival;
        if(s.length>0) { // 农历节日
            if(s.length>6) {
                s2 = s.toString();
                s = s.substr(0, 4)+'...';
            }
            lunar_detail.color = "#32CD32";
        } else { // 廿四节气
            s=cld_day.solarTerms;
            s2=s.toString();
            if(s.length>0) {
                lunar_detail.color = "#32CD32";
                if((s =='清明')||(s =='芒种')||(s =='夏至')||(s =='冬至')) {
                    lunar_detail.color = "#32CD32";
                    if(s =='清明')
                        s = '清明节';
                }
            }
            /*else
             { // 公历节日
             s=cld_day.solarFestival;
             s2 = s.toString();
             if(s.length>0) {
             if(s.length>6)
             {

             s = s.substr(0, 4)+'..';
             }
             lunar_detail.color = "#46BAEC";
             }
             }*/
        }
		lunar_detail.l_day_y = cDay(cld_day.lDay);
        if(s.length>0) {
            lunar_detail.l_day = s;
            lunar_detail.l_day_full = s2;
			
        }
        //var info = templates.getChinaNum(lunar_detail.l_month)+"月"+lunar_detail.l_day;

        //var info = lunar_detail.l_day;
        return lunar_detail;
    },
    date_to_str: function(format,utc) {
        format=format.replace(/%[a-zA-Z]/g, function(a) {
            switch(a) {

                case "%d":
                    return "\"+calwnl.date.to_fixed(date.getDate())+\"";
                case "%m":
                    return "\"+calwnl.date.to_fixed((date.getMonth()+1))+\"";
                case "%j":
                    return "\"+date.getDate()+\"";
                case "%n":
                    return "\"+(date.getMonth()+1)+\"";
                case "%y":
                    return "\"+calwnl.date.to_fixed(date.getYear()%100)+\"";
                case "%Y":
                    return "\"+date.getFullYear()+\"";
                case "%D":
                    return "\"+calwnl.locale.date.day_short[date.getDay()]+\"";
                case "%l":
                    return "\"+calwnl.locale.date.day_full[date.getDay()]+\"";
                case "%M":
                    return "\"+calwnl.locale.date.month_short[date.getMonth()]+\"";
                case "%F":
                    return "\"+calwnl.locale.date.month_full[date.getMonth()]+\"";
                case "%h":
                    return "\"+calwnl.date.to_fixed((date.getHours()+11)%12+1)+\"";
                case "%H":
                    return "\"+calwnl.date.to_fixed(date.getHours())+\"";
                case "%i":
                    return "\"+calwnl.date.to_fixed(date.getMinutes())+\"";
                case "%a":
                    return "\"+(date.getHours()>11?\"pm\":\"am\")+\"";
                case "%A":
                    return "\"+(date.getHours()>11?\"PM\":\"AM\")+\"";
                case "%s":
                    return "\"+calwnl.date.to_fixed(date.getSeconds())+\"";
                default:
                    return a;
            }
        });
        if (utc)
            format=format.replace(/date\.get/g,"date.getUTC");
        return new Function("date","return \""+format+"\";");
    },
    numToWeek: function(inStr) {
        switch (inStr) {
            case 1:
                return '一';
            case 2:
                return '二';
            case 3:
                return '三';
            case 4:
                return '四';
            case 5:
                return '五';
            case 6:
                return '六';
            case 0:
                return '日';
        }
    },
    str_to_date: function(format,utc) {
        var splt="var temp=date.split(/[^0-9a-zA-Z]+/g);";
        var mask=format.match(/%[a-zA-Z]/g);
        for (var i=0; i<mask.length; i++) {
            switch(mask[i]) {
                case "%j":
                case "%d":
                    splt+="set[2]=temp["+i+"]||0;";
                    break;
                case "%n":
                case "%m":
                    splt+="set[1]=(temp["+i+"]||1)-1;";
                    break;
                case "%y":
                    splt+="set[0]=temp["+i+"]*1+(temp["+i+"]>50?1900:2000);";
                    break;
                case "%h":
                case "%H":
                    splt+="set[3]=temp["+i+"]||0;";
                    break;
                case "%i":
                    splt+="set[4]=temp["+i+"]||0;";
                    break;
                case "%Y":
                    splt+="set[0]=temp["+i+"]||0;";
                    break;
                case "%a":
                case "%A":
                    splt+="set[3]=set[3]%12+((temp["+i+"]||'').toLowerCase()=='am'?0:12);";
                    break;
                case "%s":
                    splt+="set[5]=temp["+i+"]||0;";
                    break;
            }
        }
        var code ="set[0],set[1],set[2],set[3],set[4],set[5]";
        if (utc)
            code =" Date.UTC("+code+")";
        return new Function("date","var set=[0,0,0,0,0,0]; "+splt+" return new Date("+code+");");
    }
};
calwnl.templates= {};
calwnl.config= {
    default_date: "%Y-%m-%d %H:%i",
    month_date: "%F %Y",
    load_date: "%Y-%m-%d",
    week_date: "%l",
    day_date: "%D, %F %j",
    hour_date: "%H:%i",
    month_day : "%d",
    xml_date:"%Y/%m/%d %H:%i",
    api_date:"%Y-%m-%d %H:%i",
    server_utc:false
};
calwnl.init_templates= function() {
    var d=calwnl.date.date_to_str;
    var c=calwnl.config;
    var f = function(a,b) {
        for (var c in b)
            if (!a[c])
                a[c]=b[c];
    };
    f(calwnl.templates, {
        day_date:d(c.default_date),
        month_date:d(c.month_date),
        week_date: function(d1,d2) {
            return calwnl.templates.day_date(d1)+" &ndash; "+calwnl.templates.day_date(calwnl.date.add(d2,-1,"day"));
        },
        day_scale_date:d(c.default_date),
        month_scale_date:d(c.week_date),
        week_scale_date:d(c.day_date),
        hour_scale:d(c.hour_date),
        time_picker:d(c.hour_date),
        event_date:d(c.hour_date),
        month_day:d(c.month_day),
        xml_date:calwnl.date.str_to_date(c.xml_date,c.server_utc),
        load_format:d(c.load_date,c.server_utc),
        xml_format:d(c.xml_date,c.server_utc),
        api_date:calwnl.date.str_to_date(c.api_date),
        event_header: function(start,end,ev) {
            return calwnl.templates.event_date(start)+" - "+calwnl.templates.event_date(end);
        },
        event_text: function(start,end,ev) {
            return ev.text;
        },
        event_class: function(start,end,ev) {
            return "";
        },
        month_date_class: function(d) {
            return "";
        },
        week_date_class: function(d) {
            return "";
        },
        event_bar_date: function(start,end,ev) {
            return calwnl.templates.event_date(start)+" ";
        },
        event_bar_text: function(start,end,ev) {
            return ev.text;
        }
    });
};

/*==================================语言处理============================*/
calwnl.locale= {
    date: {
        month_full: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        month_short: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        day_full: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        day_short: ["日", "一", "二", "三", "四", "五", "六"]
    }
};
/*============================== JCT模版的封装 ===========================*/
var tplMgr = {
    tplMap : {},
    getInstance : function(id) {
        var instance = this.tplMap[id];
        if (!instance) {
            instance = new jCT($.dom(id).value);
            instance.Build();
            this.tplMap[id] = instance;
        }
        return instance;
    },
    getTemplate : function(id) {
        var element = $.dom(id);
        var content = element.value; // Like textarea.value.
        if (content == null)
            content = element.innerHTML; // Like textarea.innerHTML.
        content = content.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        return content;
    },
    loadTemplate : function(id, url, callback) {
        if ($('textarea[id=' + id + ']').length > 0) { // 如果已经载入
            if (callback) {
                callback();
            }
        } else {
            // utils.showLoadingShadow();
            $.get(url, {
                t : Math.ceil(Math.random() * 100)
            }, function(data) {
                // var tpl = data.replace(/</g, '&lt;').replace(/>/g,
                // '&gt;');
                $('<textarea id="' + id
                + '" style="display:none"></textarea>')
                .appendTo('body').val(data);
                if (callback) {
                    callback();
                }
            });
        }
    }
};

/*===============================dialog========================*/
var dialogMgr = {
    dialog : null,
    option : null,
    moving : false,
    pos : null,

    show : function(el, options) {

        var op = {
            width : 428,
            title : '',
            draggable : true
            // 默认对话框允许点击标题栏拖动
        };

        var options = options || {};

        for (var p in options) {
            op[p] = options[p];
        }

        if (this.dialog) {
            this.hide();
        }

        this.option = op;
        this.dialog = $.dom(el);
        var width = this.option.width;
        var w = utils.getClientWidth();
        var left = 0;

        if (w > width) {
            left = (w - width) / 2;
        }
        this.dialog.style.left = left + 'px';
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var top = 30 + scrollTop;
        this.dialog.style.top = top + 'px';

    },
    hide : function() {
        if (this.dialog) {

            $(this.dialog).hide();

            if (this.option.hideCallback) {
                try {
                    this.option.hideCallback();
                } catch (ex) {
                }
            }
            this.option = null;
            this.dialog = null;
            this.moving = false;
            this.pos = null;
        }
    }
};
/*================ 日历实用类 ==========================*/
var CalUtil = {
    /*
     * 返回一个对象,包含date所在月份的月视图的第一天和最后一天的日期,以及显示在月视图中的行数{start:..., end:..., row:...}
     */
    monthViewInfo : function(date, startOnMonday) {
        var dateUtil = calwnl.date;
        var info = {};
        var s_date = dateUtil.copy(date);
        s_date = dateUtil.month_view_start(s_date, startOnMonday);
        info.start = dateUtil.copy(dateUtil.week_start(s_date, startOnMonday));
        var e_date = dateUtil.copy(date);
        e_date.setMonth(date.getMonth() + 1);
        e_date.setDate(1);
        info.row = Math.ceil((e_date.valueOf()-s_date.valueOf()) / 604800000);
        info.end = dateUtil.add(info.start, 7*info.row, 'day');
        return info;
    }
};
/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
var colors = ['#CC3333', '#DD4477', '#994499', '#6633CC', '#336699', '#3366CC',
		'#22AA99', '#329262', '#109618', '#66AA00', '#AAAA11', '#D6AE00',
		'#EE8800', '#DD5511', '#A87070', '#8C6D8C', '#627487', '#7083A8',
		'#5C8D87', '#898951', '#B08B59'];


//dataHandler.js
/*=============== 数据处理  DataHandler ================*/
var DataHandler = {
    /*
     * 记录缓存中数据的时间范围 XXX xj: 似乎yzm修改过缓存记录方式之后此数据已经无用了
     */
    cachedData : {
        from : new Date(),
        to : new Date()
    },
	loadCld : {},
    getLoadCld : function(dateStart, dateEnd,cld){
		var sel = [];
		var str = getDateKey(dateStart)+"-"+getDateKey(dateEnd);
		for(var i=0;i<cld.length;i++)
		{
			var signal = str+"-"+cld[i];
			if(typeof DataHandler.loadCld[signal] == 'undefined')
			{
				sel.push(cld[i]);
				DataHandler.loadCld[signal] = {};
			}
			
		}
		if(sel.length>0)
			return sel.join(",");
		else
			return false;
	},
    /*
     * 缓存中format以后的数据,格式见formatSchData
     */
    resultData: {},
    
    /*
     * id为键,日程简介为值
     */
    resultDataById: {},
    
    /*
     * 根据起始时间取日程数据,若缓存中不存在所需数据,则ajax请求并入缓存,若已存在,则数据请求无动作;若callback存在,调用之
     * dateStart, dateEnd : Date
     * callback : function
     */
    getSchByPeriod : function(dateStart, dateEnd, callback) {
        var s_time = dateStart, e_time = dateEnd;
        if (dateStart >= this.cachedData.from) {
            s_time = this.cachedData.to;
        }
        if (dateEnd <= this.cachedData.to) {
            e_time = this.cachedData.from;
        }
		var cld = calendarHandler.getSelectedArray();
			
		var cldStr = DataHandler.getLoadCld(dateStart, dateEnd,cld);
        if(cldStr) {
			
			// 杨：获取当前选中的日历id
            $.ajax({
                url: '/schedule/list.do',
                async: true,
                type: 'post',
                dataType: 'json',
                data: {
                    fromDate: calwnl.templates.load_format(dateStart),
                    toDate: calwnl.templates.load_format(dateEnd),
                    timeZone: - (new Date()).getTimezoneOffset() / 60,
                    calendarId: cldStr
               },
                success: function(result) {
					for(var i=0;i<result.length;i++)
					{
						var cldObj = result[i];
						DataHandler.formatSchData(cldObj.schlist, e_time);
					}
                    if(DataHandler.cachedData.from > s_time)
                       DataHandler.cachedData.from = s_time;
                    if(DataHandler.cachedData.to < e_time)
                       DataHandler.cachedData.to = e_time;
                    if(callback) {
                       callback();
                    }
                }
            });
        } else {
            if(callback) {
                callback();
            }
        }
    },
    
    /*
     * 获取date所在月份月视图区域内数据并显示,若缓存中存在所需数据,则返回缓存中数据,否则ajax请求数据
     * date : Date
     * callback : function
     * startOnMonday : 周一作为第一天,为true, 否则为false
     */
    getSchByMonth : function(date, callback, startOnMonday) {
        var s_date = calwnl.date.month_view_start(date, startOnMonday);
        var e_date = calwnl.date.add(s_date, CalUtil.monthViewInfo(date, startOnMonday).row*7, 'day');
        this.getSchByPeriod(s_date, e_date, callback);
    },
    
    /*
     * 此方法是从格式化的日程数据中获取一段时间的日程并返回规定的数据格式
     * 具体的数据格式如下
     * {
     *      "d2011-05-01":{
     *          schList:[{日程信息}],    // 该天的日程列表，todo：跨天日程的处理方式，重复日程，
     *          num:   // 日程的条数
     *      },
     *      "d2011-05-02":{
     *          schList:[]
     *          num:   // 日程的条数
     *      },
     *      maxNum:    // 算出最多日程的条数  方便月视图显示日程
     * }
     * 
     * sTime, eTime : Date OR string
     */
    getSchedulesByRange: function(sTime,eTime,data,cld) {
        var result= {};
        var dataSch = data||DataHandler.resultData;
        if(typeof sTime=="string") {
            sTime = calwnl.templates.api_date(sTime);
        }
        if(typeof eTime=="string") {
            eTime = calwnl.templates.api_date(eTime);
        }
        sTime = calwnl.date.date_part(sTime);
        eTime = calwnl.date.date_part(eTime);
        for(;sTime<=eTime;) {
            var k = "d"+getDateKey(sTime);
            result[k]= {
                schList:[],
                num:0
            };
            if(dataSch[k]) {
				var schList_temp = [];
				for(var j = 0; j<dataSch[k].schList.length;j++)
				{
					var sch_t = dataSch[k].schList[j];
					for(var q = 0;q<cld.length;q++)
					{
						if(sch_t.cid==cld[q])
						{
							schList_temp.push(sch_t);
							break;
						}
					}
				}
                result[k].schList = schList_temp;
                result[k].num = schList_temp.length;
            }
            sTime = calwnl.date.add(sTime,1,"day");
        }
        var maxNum = 0;
        for(var i in result) {
            var k = result[i];
            if(k.num>maxNum)
                maxNum = k.num;
        }
        result.maxNum = maxNum;
        return JSON.parse(JSON.stringify(result)); //make a copy of data to keep original data safe
    },
    
    /*
     * 为了提高日程数据的处理效率，减少重复处理，将日程数据格式化为以下模式
     * {
     *      "d2011-05-01":{
     *          schList:[{日程信息}]    // 该天的日程列表，日程列表是排好序的，排序规则：1、按照时间排序，如果时间相同则按照日历id、日程id或者可以是日程的添加时间；todo：跨天日程的处理方式，重复日程，
     *      },
     *      "d2011-05-02":{
     *          schList:[]
     *      }
     * }
     * 
     * data : Object
     * dateScope : Date
     */
    formatSchData : function(data,dateScope) {
        var result = {};
        /*
         * 注：对于数组的操作，尽量少用for(var i in data) 模式，因为此模式不仅会操作数组中的数据，同时会操作数组对象的其他属性，
         * 此处只需要遍历一遍日程列表即可，但是需要注意对跨天日程的拆分，需要添加三个字段 1、cross_st  2、cross_et,3、是否显示isDisplay
         */
        for(var i=0;i<data.length;i++) {
            var sch = data[i];
            if('' == sch.text) sch.text = '(无标题)';
            var sTime = calwnl.templates.api_date(sch.start_time);
            var eTime = new Date(sTime.valueOf()+sch.duration*1000);

            var sTemp = calwnl.date.copy(sTime);
            var sideTime = calwnl.date.add(calwnl.date.date_part(sTemp),1,"day");
			sch.isDisplay = 0;
            if(sideTime>=eTime) {
                var key = "d"+getDateKey(sTime);
                if(!result[key])
                    result[key]= {
                        schList:[]
                    };
                result[key].schList.push(sch);
            } else {
                var s_t = calwnl.date.copy(sTime);
                for(;s_t<eTime&&s_t<dateScope;)     // 此处应当避免没有必要阶段性日程划分；TODO：对日程进行排序
                {
                    var k = "d"+getDateKey(s_t);
                    var sch_temp = DataHandler.copySch(sch);
                    sch_temp.cross_st = calwnl.templates.day_date(s_t)+":00";
                    var e_t = calwnl.date.add(calwnl.date.date_part(s_t),1,"day");
                    if(e_t<=eTime)
                        sch_temp.cross_et = calwnl.templates.day_date(e_t)+":00";
                    else
                        sch_temp.cross_et = calwnl.templates.day_date(eTime)+":00";
                    if(!result[k])
                        result[k]= {
                            schList:[]
                        };
                    result[k].schList.push(sch_temp);
                    s_t = e_t;
                }
            }
        }
        DataHandler.mergeData(DataHandler.resultData, result);
        DataHandler.formatSchDataById(data);
    },
    
    /*
     * 为了提高日程数据的处理效率，减少重复处理，将日程数据格式化为以下形式(作用待评估,暂时保留)
     * {
     *      "1234":{日程信息}, //id 为key的日程的信息
     *      "1235":{}
     *      ... ...
     * }
     */
    formatSchDataById : function(data) {
        var result = {};
        for(var i=0;i<data.length;i++) {
            result[data[i].id] = data[i];
        }
        $.extend(true, DataHandler.resultDataById, result);
    },

    /*
     * 将source中的日程数据合并到target中
     * 基于DataHandler.resultData的数据结构
     */
    mergeData: function (target, source) {
        for(var dailySch in source) {
            if(target[dailySch]) {
                var src = source[dailySch]['schList'];
                var tgt = target[dailySch]['schList'];
                for(var i = 0; i < src.length; ++i) {
                    var flag = false;
                    for(var j = 0; j < tgt.length; ++j) {
                        if(tgt[j].id == src[i].id) {
                            tgt[j] = src[i];
                            flag = true;
                            break;
                        }
                    }
                    if(!flag) {
                        tgt.push(src[i]);
                    }
                }
            } else {
                target[dailySch] = source[dailySch];
            }
            //对日程排序按开始时间排序
            target[dailySch].schList.sort(function(a, b) {
                if(a.allday_event) return -1;
                if(b.allday_event) return 1;
                var a_stime = calwnl.templates.api_date(a.start_time).getTime();
                var b_stime = calwnl.templates.api_date(b.start_time).getTime();
                return (a_stime - b_stime);
            });
        }
    },
    
    /*
     * 根据日程id在缓存中删除日程
     */
    delSchById: function(id) {
        for (var dailySch in DataHandler.resultData) {
            var schList = DataHandler.resultData[dailySch]['schList'];
            for (var i = 0; i < schList.length; ++i) {
                if (schList[i].id == id) {
                    schList.splice(i, 1);
                    --i;
                }
            }
        }
        delete DataHandler.resultDataById[id];
    },
    
    /*
     * 根据日程id在缓存中更新数据
     * sch : Obj
     * dateScope : Date
     */
    updateSch: function(schList, dateScope) {
        DataHandler.delSchById(schList[0].id);
        DataHandler.formatSchData(schList, dateScope);
    },
    
    /*
     * 克隆日程
     */
    copySch : function(sch) {
        var t = function() {
        };
        t.prototype = sch;
        return new t();
    }
};



//calendarHandler.js
(function(window){
	/*
	 * 私有变量
	 */
	var startOnMonday=true,
	reg=/^d(\d{4})-(\d{2})-(\d{2})/,
	r2=/^0/,
	calendarId=null,	//当前用户的主日历id
	navDate=null,		// 当前月份的第一天
	seletedDate=null,	//当前选择的日期
	hoverDate = null,	//hover的日期
	schData=null;		//用户的日程数据
	
	/*
	 * 私有方法
	 */
	var log=function(message){
	},
	
	//设置NavDate
	setNavDate=function(date){
		if(date instanceof Date)
			navDate=date;
		else
			navDate=null;
	},
	
	//获取navaDate所在月份的数据，赋值给schData
	getCurrentMonthViewData=function(callback){
		if(navDate){
			DataHandler.getSchByMonth(navDate, function(){
				var monthInfo = CalUtil.monthViewInfo(navDate,startOnMonday);
				var s=monthInfo.start,
					e=monthInfo.end;
				var cld=new Array();
				cld.push(calendarId);
				schData = DataHandler.getSchedulesByRange(s,e,DataHandler.resultData,cld);
				
				if(callback){
					callback();
				}
			}, startOnMonday);
			
		}
	},
	
	//添加日程
	creatSch=function(text,allday,hour,second,callback){
		var sch = {};
        sch.schTitle = text;
        sch.alldayEvent = allday;
        if(allday) {
            sch.startTime = getDateKey(seletedDate) + ' ' + '09:00:00';
        } else {
        	hour = hour + "";
        	second = second + "";
            sch.startTime = getDateKey(seletedDate) + ' ' + hour.leftpad(2) + ':' + second.leftpad(2) + ":00";
        }
        sch['timeZone'] = - (new Date()).getTimezoneOffset() / 60;
        // dialog内添加的都是简单日程(不重复,不跨天)
        var dateScope = calwnl.date.add(calwnl.templates.api_date(sch.startTime), 1, 'day');
        $.ajax({
            type: 'post',
            data: sch,
            url: '/schedule/update.do',
            success: function(result) {
				for(var i=0;i<result.length;i++)
				{
					var cldObj = result[i];
					DataHandler.formatSchData(cldObj.schlist, dateScope);
				}
				getCurrentMonthViewData(function(){
					for(var key in schData){
						if(key!="maxNum"){
							var num = schData[key].num;
							var k= key.replace(reg,function(all,year,month,date){
								return year+"-"+month.replace(r2,"")+"-"+date.replace(r2,"");
							});
							if(num > 0){
								callback(calwnl.templates.api_date(k));
							}
						}
					}
				});
            },
            dataType: 'json'
        });
	},
	
	cutByRealLength=function(str,size){
		var totalCount=0;
		var i;
		for(i=0;i<str.length;i++){
			var c=str.charCodeAt(i);
			if((c>=0x0001&&c<=0x007e)||(0xff60<=c&&c<=0xff9f)){
				totalCount++;
			}else{
				totalCount+=2;
			}if(totalCount>=size){
				return str.substring(0,i+1);
			}
		}
		return str;
	};
	var UI={
		//显示日程
		drawSch:function(schList){
			
			$("#taskList").children().remove();
			var schs = [];
			if(schList.length>0){
				for(var i = 0; i < 3 && i < schList.length; i++){
					var showTxt=cutByRealLength(schList[i].text,10);
					if(showTxt.length<schList[i].text.length){
						showTxt+="...";
					}
					var showTime = "&nbsp;";
					if(! schList[i].allday_event){
						var raw = schList[i].start_time.split(' ')[1].split(':');
						raw.splice(2);
						showTime = raw.join(':') + "&nbsp;";
					}
					//var showTime = schList[i].start_time + schList[i];
					//alert(showTime);
					schs.push("<div class='workitem'>");
						schs.push("<div class='tastWorkDot'></div>");
						if(! schList[i].allday_event){
							schs.push("<div class='taskWorkTime'>" + showTime + "</div>");
							schs.push("<div style='margin-left:5px;'>" + showTxt + "</div>");
						}else{
							schs.push("<div style='margin-left:11px;'>" + showTxt + "</div>");
						}
						
					schs.push("</div>");
				}
			}
			$("#taskList").html(schs.join(''));
		}
	};
	
	
	var calendarHandler={
		init:function(id){
			if(typeof id == 'number')
				calendarId=id;
			else if(typeof id == 'string')
				calendarId=parseInt(id);
			navDate=seletedDate=new Date();
			calwnl.init_templates();
		},
		//根据calendarId变量，判断是否登陆
		isLogin:function(){
			return !!calendarId;
		},
		//dataHandler调用，返回选中的日历id
		getSelectedArray:function(){
			var t=new Array();
			t.push(calendarId);
			return t;
		},
		//准备特定月份的数据
		prepareData4:function(year,month , callback){
			var date=new Date();
			date.setYear(year);
			date.setMonth(month-1);
			date.setDate(1);
			setNavDate(date);
			getCurrentMonthViewData(function(){
				for(var key in schData){
					if(key!="maxNum"){
						var num = schData[key].num;
						var k= key.replace(reg,function(all,year,month,date){
							return year+"-"+month.replace(r2,"")+"-"+date.replace(r2,"");
						});
						if(num > 0){
							var tttt = calwnl.templates.api_date(k);
							callback(tttt);
						}
					}
				}
				//callback();
			});
		},
		//获取seletedDate
		getSelectedDate:function(){
			return seletedDate;
		},
		//设置seletedDate
		setSelectedDate:function(date){
			if(typeof date == "string")
				seletedDate = calwnl.templates.api_date(date);
			else if(date instanceof Date)
				seletedDate = date;
		},
		//获取hoverDate对应的日程数据
		getSch:function(){
			return schData["d"+getDateKey(hoverDate)];
		},
		//添加日程
		addSch:function(text,allday,hour,second,callback){
			creatSch(text,allday,hour,second,callback);
		},
		//显示日程
		drawSch:function(){
			if(this.isLogin()){
				UI.drawSch(this.getSch().schList);
			}
		},
		//设置hoverDate
		setHoverDate:function(date){
			if(typeof date == "string")
				hoverDate = calwnl.templates.api_date(date);
			else if(date instanceof Date)
				hoverDate = date;
		}
	};
	//公开calendarHandler对象
	if(window.calendarHandler){
		window._calendarHandler=window.calendarHandler;
	}
	window.calendarHandler=calendarHandler;
})(window); 

	
