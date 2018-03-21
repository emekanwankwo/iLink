angular.module('homePage')
.component('homePage', {
    templateUrl: 'pages/home-page/home-page.template.html',
    controller: function HomePageController($http, HomepageService) {
        this.phoneNumbers = [];
        this.phoneNumbersData = [];
        this.currentPhoneNumber = [];

        /**
         * GenerateNumbers
         */
        this.generateNumbers = () => {
            // Instantiate an empty array and define the number of random phone numbers we need
            const randomNumbers = [];
            const limit = 100;
            let i = 1;
            // generate random phone numbers of 9 digits up to the limit
            while (i < limit) {
                let numberLength = 100000000;
                let randomNumber = Math.random() * 900000000;
                randomNumber += numberLength;

                // Round up random number to a whole number
                randomNumber = Math.floor(randomNumber);
                randomNumbers.push(`0${randomNumber}`);
                i++;
            }
            this.phoneNumbers = randomNumbers;
            
            //Save generated numbers
            this.savePhoneNumbers();
        }

        /**
         * GetPhoneNumbers
         */
        this.getPhoneNumbers = (entryId) => {
          HomepageService.getPhoneNumber(entryId, response => {
            //
          });
        }

        /**
         * sortPhoneNumbers
         * @param {order} (optional) can be specified as 'desc'
         */
        this.sortPhoneNumbers = (order) => {
            return args.sort((phoneNumber1, phoneNumber2) => {
                return (order === 'desc') ? phoneNumber2 - phoneNumber1 : phoneNumber1 - phoneNumber2;
            });
        }

        /**
         * savePhoneNumbers
         */
        this.savePhoneNumbers = () => {
            HomepageService.savePhoneNumbers(this.phoneNumbers, (response) => {
              //
              this.loadPhoneNumberIds();
            });
        }

        /**
         * loadPhoneNumbers
         */
        this.loadPhoneNumberIds = () => {
            HomepageService.loadPhoneNumberIds(response => {
              this.phoneNumbersData = [];
              // Update phone numbers object
              response.data.forEach(entryId => {
                let entryDetail = {};
                entryDetail.id = entryId;
                entryDetail.date = Date(entryId);
                this.phoneNumbersData.push(entryDetail);
              })
            });
        }

        // Load already generated phone numbers
        this.loadPhoneNumberIds();
    }
})
