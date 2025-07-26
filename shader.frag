// mandelbrot.glsl

extern vec2 center;
extern float scale; 
extern number max_iter;

vec2 complexSquare(vec2 z) {
    return vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y);
}

vec2 complexAdd(vec2 a, vec2 b) {
    return vec2(a.x + b.x, a.y + b.y);
}

vec4 effect(vec4 color, Image texture, vec2 pixel_coords, vec2 screen_coords) {

    // Convert screen coordinates to fractal (complex) coordinates, to [-1, 1]	
    vec2 uv = vec2(
      3.5 * screen_coords.x / love_ScreenSize.x - 2.5, // 2.0 would stretch, kj
      2.0 * screen_coords.y / love_ScreenSize.y - 1.0
    ); 

    vec2 c = vec2(center.x + uv.x * scale, center.y + uv.y * scale);
    vec2 z = vec2(0.0);   

    number i;
    for (i = 0.0; i < max_iter; i++) {
        if (dot(z, z) > 4.0) break;
        z = complexAdd(complexSquare(z), c);
    }

    // Simple coloring: black inside, color based on escape speed outside
    if (i == max_iter) {
        return vec4(0.0, 0.0, 0.0, 1.0); // Inside Mandelbrot
    } else {
        number t = i / max_iter;
        return vec4(t, t * t, 1.0 - t, 1.0); // Gradient: purple-ish
    }
}
