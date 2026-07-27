const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_fake_key_for_dev');

// Packages data matching frontend
const packages = {
  starter: {
    name: 'Starter Package',
    price: 1500, // $1500
  },
  professional: {
    name: 'Professional Package',
    price: 3500, // $3500
  },
  enterprise: {
    name: 'Enterprise Package',
    price: 8000, // $8000
  }
};

exports.createCheckoutSession = async (req, res) => {
  try {
    const { packageId } = req.body;
    const selectedPackage = packages[packageId];

    if (!selectedPackage) {
      return res.status(400).json({ error: 'Invalid package selected' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selectedPackage.name,
              description: 'DevForge Innovations - Web Development Services',
            },
            unit_amount: selectedPackage.price * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/payment-cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Session Error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.webhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // If webhook secret is configured, verify signature
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } else {
      event = req.body; // For testing without signature verification
    }
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Here you would typically update the database, grant access, or notify the team
    console.log(`Payment successful for session ID: ${session.id}`);
  }

  res.json({ received: true });
};
