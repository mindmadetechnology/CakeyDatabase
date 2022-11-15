const router = require('./auth');

// const upload = require("../middleware/multer");

// const Authorization = require('../middleware/autherization');

const {
    AddTickets, IntimationUpdate,
} = require("../controllers/TicketController");

router.post('/tickets/new', AddTickets);

router.put('/tickets/update/intimation/:Id', IntimationUpdate);

module.exports = router;