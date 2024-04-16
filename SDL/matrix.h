#pragma once
#ifndef MATRIX_H
#define MATRIX_H

typedef struct {
    float m[4][4];
} mat4_t;

// returns identity matrix
mat4_t mat4_identity(void);

mat4_t mat4_make_scale(float sx, float sy, float sz);
mat4_t mat4_make_translation(float sx, float sy, float sz);

mat4_t mat4_make_rotation(float sx, float sy, float sz);
#endif
