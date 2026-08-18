const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
    const { email, password } = JSON.parse(event.body);

    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY
    );

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        return {
            statusCode: 401,
            body: JSON.stringify({ error: error.message })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ token: data.session.access_token })
    };
};