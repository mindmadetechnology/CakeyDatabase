const router = require('./auth');

// const upload = require("../middleware/multer");

// const Authorization = require('../middleware/autherization');

const {
    AddTickets, IntimationUpdate,
} = require("../controllers/TicketController");

const {
    GetOrdersListForHelpdesk
} = require("../controllers/GetOrdersListController");

router.post('/tickets/new', AddTickets);

router.put('/tickets/update/intimation/:Id', IntimationUpdate);

router.get('/helpdesk/deliveryOrders/list/:StartDate/:EndDate', GetOrdersListForHelpdesk);

module.exports = router;