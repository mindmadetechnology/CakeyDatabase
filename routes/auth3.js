const router = require('./auth');

// const upload = require("../middleware/multer");

// const Authorization = require('../middleware/autherization');

const {
    AddTickets, IntimationUpdate,
} = require("../controllers/TicketController");

const {
    GetDeliveryOrdersListForHelpdesk, GetCurrentOrdersListForHelpdesk
} = require("../controllers/GetOrdersListController");

router.post('/tickets/new', AddTickets);

router.put('/tickets/update/intimation/:Id', IntimationUpdate);

router.get('/helpdesk/deliveryOrders/list/:StartDate/:EndDate', GetDeliveryOrdersListForHelpdesk);

router.get('/helpdesk/currentOrders/list/:StartDate/:EndDate', GetCurrentOrdersListForHelpdesk);

module.exports = router;