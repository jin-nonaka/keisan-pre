'use strict';
{
    // idを取得する
    let price = document.getElementById('price');
    let manNum = document.getElementById('manNum');
    let girlNum = document.getElementById('girlNum');
    let btn1 = document.getElementById('btn1');
    let btn2 = document.getElementById('btn2');
    let than = document.getElementById('than');
    let rate = document.getElementById('rate');
    let result = document.getElementById('result');
    let result2 = document.getElementById('result2');
    let result3 = document.getElementById('result3');
    let reset = document.getElementById('reset');
    let pho = document.getElementById('pho');
    let pho2 = document.getElementById('pho2');

    
   
    

    

    price.addEventListener('keyup',checkInput);
    girlNum.addEventListener('keyup',checkInput);
    manNum.addEventListener('keyup',checkInput);
    than.addEventListener('keyup',checkInput);
    rate.addEventListener('keyup',checkInput);       
    
    //この条件を満たして初めて、漢を見せるボタン、計算するボタンが押せる
    function checkInput() {          
        if(// /^[1-9][0-9]*$/:正規表現（一桁目は1~9、2桁目は0~9,*でゼロ回以上繰り返されるという意味）
            price.value.match(/^[1-9][0-9]*$/) !== null &&
                girlNum.value.match(/^[1-9][0-9]*$/) !== null &&
                manNum.value.match(/^[1-9][0-9]*$/) !== null
            ) {
                btn2.classList.remove('disabled');
                audio.src='漢祭り.mp3';
                audio.play(); //audioを再生
            }else {
                btn2.classList.add('disabled');
            }
            if(
                price.value.match(/^[1-9][0-9]*$/) !== null &&
                girlNum.value.match(/^[1-9][0-9]*$/) !== null &&
                manNum.value.match(/^[1-9][0-9]*$/) !== null &&
                (than.value.match(/^[1-9][0-9]*$/) !== null || rate.value.match(/^[1-9][0-9]*$/) !== null)
            ) {
                btn1.classList.remove('disabled');
            }else {
                btn1.classList.add('disabled');
            } 
            if(//多く支払うフォームと男性が〇割り支払うフォームの両方に値があるとすべてのフォームがリセットされる
                than.value.match(/^[1-9][0-9]*$/) !== null  &&
                rate.value.match(/^[1-9][0-9]*$/) !== null
            ) {
                //リセットの内容
                btn1.classList.add('disabled');
                // btn2.classList.add('disabled');
                alert('条件に間違いがあるよ！');
                rate.value='';
                than.value='';
                than.focus();
            }   
        }
    
        // 漢を見せるボタンの処理
    btn2.addEventListener('click', function () {
      
        // audio.src='漢祭り.mp3';
        // audio.play(); //audioを再生
        
            // disabledクラスを含むときは以下の処理を走らせない
            if (this.classList.contains('disabled') === true) {
                return;
            }
            
            let comfirm = window.confirm("漢気を見せます！本当にいいですか？");
            if(comfirm) {
                let amount;
                let str;
                let str2;
                amount = Math.floor(price.value/Number(manNum.value)*10)/10;
                str = 'ナイス漢気！！ いい事あるかも！'; 
                str2 =' ・男性一人' + amount + '円!';
                result.classList.add('output');
                result.textContent = str;
                result2.textContent = str2;
                result3.classList.add('output3');
                reset.classList.remove('hidden');
                pho.classList.remove('pic');
                result2.classList.remove('output2');
                pho2.classList.add('pic2');
                audio.pause(); //audioを再生
     
            }           
        });

        // 計算ボタンの処理
        btn1.addEventListener('click', function() {
            let manAmount;
            let girlAmount;
            let str;
            let str2;
            let str3;
            let temAmount;
            let temGirl;
            let temMan;

            // disabledクラスを含むときは処理を走らせない
            if (this.classList.contains('disabled') === true) {
                return;
              }
            //男性が多く支払うが空文字である時の処理
            if(than.value === '' ) {

                temMan = price.value*(rate.value/10)/ manNum.value;
                temGirl = (price.value - manAmount*manNum.value) / girlNum.value;
                manAmount = Math.floor((price.value*(rate.value/10)/ manNum.value)*10)/10;
                girlAmount = Math.floor(((price.value - temMan*manNum.value) / girlNum.value)*10)/10;
                
                str = '男！！漢気見せろ！！';
                str2 = '・男性一人' + manAmount + '円!';
                str3 = ' ・女性一人' + girlAmount + '円！'; 
                
                result.textContent = str;
                result2.textContent = str2;
                result3.textContent = str3;

                reset.classList.remove('hidden');
                pho2.classList.remove('pic2');
                pho.classList.add('pic');
                result2.classList.remove('output2');
                result3.classList.remove('output3');

                //男性が〇割り支払うが空文字であるときの処理
            } else if(rate.value === '') {
                temAmount = price.value - (than.value*manNum.value);
                temGirl = temAmount/(Number(girlNum.value) + Number(manNum.value));
                temMan =  temGirl + Number(than.value);
                girlAmount =  Math.floor(temGirl*10)/10;
                manAmount = Math.floor((temGirl + Number(than.value))*10)/10;

                str = '男が全部払おうよ！'; 
              
                str2 = '・男性一人' + manAmount + '円!';
                str3 = ' ・女性一人' + girlAmount + '円！'; 

                result.textContent = str;
                result2.textContent = str2;
                result3.textContent = str3;
                reset.classList.remove('hidden');
                pho2.classList.remove('pic2');
                result2.classList.remove('output2');
                result3.classList.remove('output3');
                pho.classList.add('pic');
            } else if (rate.value === '' && than.value === '') {
                
            }


           
        });
            //リセットボタンを押したときの処理
             reset.addEventListener('click',() => {
                result.textContent= 'ここに結果を表示するよ！';
                price.value = '';
                girlNum.value = '';
                manNum.value = '';
                than.value = '';
                rate.value = '';
                btn1.classList.add('disabled');
                btn2.classList.add('disabled');
                reset.classList.add('hidden');
                price.focus();
                pho.classList.add('pic');
                pho2.classList.add('pic2');
                result2.classList.add('output2');
                result3.classList.add('output3');
             });
             price.focus();

            //  マウスをリセットボタンに乗せた時の処理
             reset.addEventListener('mouseover',function() {
                 reset.style.opacity = 0.5;
                 reset.style.cursor = "pointer";
             });

            //  マウスボタンをリセットボタンから外れた時の処理
             reset.addEventListener('mouseout',function() {
                 reset.style.opacity = 1.0;
                 reset.style.cursor = "pointer";
             });
    }