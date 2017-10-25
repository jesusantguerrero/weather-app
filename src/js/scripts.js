// template
const report = {"coord":{"lon":-68.99,"lat":18.44},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F02d.png?1499366021821"}],"base":"stations","main":{"temp":28,"pressure":1014,"humidity":94,"temp_min":28,"temp_max":28},"visibility":10000,"wind":{"speed":1.76,"deg":111.006},"clouds":{"all":20},"dt":1508936400,"sys":{"type":1,"id":4126,"message":0.159,"country":"DO","sunrise":1508927591,"sunset":1508969182},"id":3500957,"name":"Template","cod":200}

const images = {
  rain:  'https://images.unsplash.com/photo-1482939910115-408c21b2f16d?dpr=1.5&auto=format&fit=crop&w=360&h=240&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
  
  clouds: 'https://images.unsplash.com/photo-1490130740012-77abcad04b26?w=750&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
  
  clear: 'https://images.unsplash.com/photo-1508182314998-3bd49473002f?w=750&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'
}

const weatherApp = new Vue({
  el: '#weather-app',
  data: {
    endpoint: 'https://fcc-weather-api.glitch.me/api/current?',
    report,
    styles: {
      "background-image": ''
    },
    celsius: true,
    grade: 'Cº',
    date: new Date(),
    time: ''
  },
  mounted() {
    this.getLocation()
    this.clock()
    this.displayView(report)
  },
  methods: {
    getLocation() {
      navigator.geolocation.getCurrentPosition(this.getWeather)
    },
    getWeather(position) {
      const self = this
      const lng = position.coords.longitude
      const lat = position.coords.latitude
      const params = `lat=${lat}&lon=${lng}`
      
      fetch(weatherApp.endpoint + params)
        .then(res => res.json())
        .then(res => {
          self.displayView(res)
        })
      
    },
    
    displayView(res) {
      console.log('here')
      console.log(this)
      const imageTag = res.weather[0].main.toLowerCase()
      this.styles['background-image'] = `url('${images[imageTag]}')`
      this.report = res
    },
    
    toggleGrade() {
      this.celsius = !this.celsius
      this.grade = (this.celsius) ? 'Cº' : 'Fº'
    },
    
    getTemp(itemName) {
      const theTemp = this.report.main[itemName]
      const temp = (this.celsius) ? theTemp : Math.round(theTemp * 1.8 + 32)
      return temp   
    },
    clock() {
      setInterval( () => this.time = new Date().toString().slice(0,24),1000 )
    }
  },
  computed: {
    temp_max() { return this.getTemp('temp_max')},
    temp_min() { return this.getTemp('temp_min')},
    now() {return}
  },
  filters: {
    hours(stamp) {
      const date = new Date(stamp)
      return `${date.toString().slice(16, 24)}`
    }
  }
})
