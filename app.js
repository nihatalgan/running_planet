// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

// https://handlebarsjs.com/guide/#custom-helpers
hbs.registerHelper("showDate", (date) => {
  // if date is unavailable, project wont run
  if (date) {
    return date.toLocaleDateString("en-UK");
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
  } else {
    return "";
  }
});

// https://stackoverflow.com/questions/48270865/render-with-handlebars-a-html-select-element-with-option-selected
hbs.registerHelper('markSelected', (currentValue, optionValue) => {
    return currentValue === optionValue ? 'selected' : ''; 
})

hbs.registerHelper('getDateInputValue', (date) => {
    if (date) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
        const dateStr = date.toLocaleDateString('en-UK'); // '20/01/2024'
        const dateArr = dateStr.split('/'); // ['20', '01', 2024']

        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
        return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`; // '2024-01-20'
    } else {
        return '';
    }
})


const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "running_planet";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/user", userRoutes);

const eventRoutes = require("./routes/event.routes");
app.use("/event", eventRoutes);
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
