#ifndef MESH_H
#define MESH_H

#include "vector.h"

// Define a constant for The number of vertices for our MESH
#define N_MESH_VERTICES 8

// in mesh.h we declare our array of vertices we use
// extern keyword because we will initialize and define
// them in mesh.c
extern vec3_t mesh_vertices[N_MESH_VERTICES];

//6 cube faces, 2 triangles per face
#define N_MESH_FACES 12

// Declare a struct for a face
typedef struct {
    int a;
    int b;
    int c;
} face_t;

// Declare an array of faces
extern face_t mesh_faces[N_MESH_FACES];

#endif
