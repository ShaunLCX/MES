#MES
### Prerequisites

Ensure you have Node.js and npm installed. 
(microsoft sql server 2019 was my first choice was due the available database in my pc right now which make my setup faster)
Using Sequelize based on my study is easier for ORM and save time for writing query and portablity for microsoft sql server
Using vuetify because of the readyness of the code and available library
uing axios to control Error Handling and Browser Compatibility


1. Please use Microsoft SQL Server for this system
2. Pleae run the following sql script provided
3. Can rename the db name for it

#Please pull from the main branch

How to run the system

#Please clone from the main branch

After cloning can follow this step

#Backend
1. Please add .env file into the back end and type in or copy this into the file

NODE_ENV=development
DATABASE_USERNAME=your_dbuser
DATABASE_PASSWORD=your_password
DATABASE_NAME=mes_db
DATABASE_HOST=your_host
DIALECT=mssql
DIALECT_OPTIONS_ENCRYPT=true
DIALECT_OPTIONS_ENABLE_ARITH_ABORT=true
PORT=3000

1.  You can check the setting on .env based on your setting in your pc can change it based it on your username password
2.  Open a terminal
3.  Based on your path then cd backend
4.  npm install
5.  after install to run it use command node index.js


#mes-frontend
1.  Open a new terminal
3.  Based on your path then cd mes-frontend
4.  npm install
5.  then after that you can npm run serve



#Take note if need to install the dependencies individually
npm install @mdi/font @vue/cli @vue/cli-service-global axios chart.js core-js element-plus material-design-icons-iconfont roboto-fontface vue vue-chartjs vue-good-table vue-good-table-next vue-router vuetify

#Take note other depencies as well
npm install --save-dev @babel/core @babel/eslint-parser @vue/cli-plugin-babel @vue/cli-plugin-eslint @vue/cli-service eslint eslint-plugin-vue


