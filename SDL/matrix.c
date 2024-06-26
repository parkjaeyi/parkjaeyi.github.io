#include "matrix.h"

mat4_t mat4_identity(void) {

    mat4_t m = { {
        {1,0,0,0},
        {0,1,0,0},
        {0,0,1,0},
        {0,0,0,1}
      } };

    return m;
}

mat4_t mat4_make_scale(float sx, float sy, float sz) {
    // | sx  0  0  0 |
    // |  0 sy  0  0 |
    // |  0  0 sz  0 |  
    // |  0  0  0  1 |
    mat4_t m = mat4_identity();
    m.m[0][0] = sx;
    m.m[1][1] = sy;
    m.m[2][2] = sz;

    return m;
}

mat4_t mat4_make_translation(float sx, float sy, float sz) {
    mat4_t m = mat4_identity();
    m.m[1][4] = sx;
    m.m[2][4] = sy;
    m.m[3][4] = sz;

    return m;
}

// make rotation for mat4
mat4_t mat4_make_rotation(float sx, float sy, float sz) {
    mat4_t m = mat4_identity();

}