const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const submitBtn = document.getElementById('submitBtn');
const data_hide = document.querySelector('.middle_layer');

//Taking all necessary values
const day = document.getElementById('day');
const today_date = document.getElementById('today_date');

const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');

const d = new Date();

const getWeekDay =()=>{
    let weekDay =['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekDay[d.getDay()];
}

const getCurrMonth = () =>{
    let currMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return currMonth[d.getMonth()];
}

day.innerText = `${getWeekDay()} `;
today_date.innerText = `${d.getDate()} ${getCurrMonth()}`;

const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value;

    if(cityVal === ""){
        city_name.innerText = "Enter valid City Name";
        data_hide.classList.add('data_hide');
    }

    else{
        try{
                let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=f43c37c02ed277e5d2004365b15403bf&units=metric`;
                const resData = await fetch(apiURL);
                const data = await resData.json();

                const arrData = [data];
                city_name.innerText = arrData[0].name;
                day.innerText = `${getWeekDay()} `;
                temp_real_val.innerText = (arrData[0].main.temp);
                const temp_mood = arrData[0].weather[0].main;

                if(temp_mood == 'Clear'){
                    temp_status.innerHTML = 
                    "<i class='fas fa-sun' style='color: #eccc68;'></i>";
                }
                else if(temp_mood == 'Clouds'){
                    temp_status.innerHTML = 
                    "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
                }
                else if(temp_mood == 'Rain'){
                    temp_status.innerHTML = 
                    "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
                }
                else{
                    temp_status.innerHTML = 
                    "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
                }
                data_hide.classList.remove('data_hide');
            }
            catch{
                city_name.innerText = "Please Enter A Valid City Name"
                data_hide.classList.add('data_hide');
            }
    }
}
    
submitBtn.addEventListener('click', getInfo);