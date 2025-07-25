// mandelbrot.glsl

extern vec2 center;
extern float scale;

vec4 effect(vec4 color, Image texture, vec2 pixel_coords, vec2 screen_coords) {
    // Normalize pixel coordinates to [-1, 1]
    vec2 uv = vec2(
      3.5 * screen_coords.x / love_ScreenSize.x - 2.5,
      2.0 * screen_coords.y / love_ScreenSize.y - 1.0
    ); // 2.0 for the x direction stretches the fractal horizontally, kj

    // Scale to complex plane
    float x0 = uv.x * scale + center.x;
    float y0 = uv.y * scale + center.y;

    // Mandelbrot iteration
    float x = 0.0;
    float y = 0.0;
    int i;
    const int max_iter = 100;

    for (i = 0; i < max_iter; i++) {
        float xtemp = x*x - y*y + x0;
        y = 2.0*x*y + y0;
        x = xtemp;

        if (x*x + y*y > 4.0) {
            break;
        }
    }

    // Map iterations to color (simple grayscale)
    float shade = float(i) / float(max_iter);
    return vec4(vec3(shade), 1.0);
}
