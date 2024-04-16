//THIS IS FOR VERTICES AND FACES OF CUBE+TRIANGLE
//THIS IS FOR VERTICES AND FACES OF CUBE+TRIANGLE
//THIS IS FOR VERTICES AND FACES OF CUBE+TRIANGLE
//THIS IS FOR VERTICES AND FACES OF CUBE+TRIANGLE
#include "mesh.h"


// this needs to be inputted in the TriangleCube.c 
vec3_t mesh_vertices[N_MESH_VERTICES] = {
    {.x = -1, .y = -1, .z = -1}, //1
    {.x = -1, .y = 1, .z = -1}, //2
    {.x = 1, .y = 1, .z = -1}, //3
    {.x = 1, .y = -1, .z = -1}, //4
    {.x = 1, .y = 1, .z = 1}, //5
    {.x = 1, .y = -1, .z = 1}, //6
    {.x = -1, .y = 1, .z = 1}, //7
    {.x = -1, .y = -1, .z = 1}  //8
};

//TODO fill in the correct index 1 - 8
face_t mesh_faces[N_MESH_FACES] ={
    //front
    {.a = 1, .b = 2, .c = 3},
    {.a = 1, .b = 3, .c = 4},
    //right
    {.a = 4, .b = 3, .c = 5}, //4,3,5
    {.a = 4 , .b = 5, .c = 6},//4,5,6
    //back
    {.a = 6, .b = 5 , .c = 7},//657
    {.a = 6, .b = 7 , .c = 8},//678
    //left
    {.a = 8 , .b = 7, .c = 2},//872
    {.a = 8, .b = 2, .c = 1},//821
    //top 
    {.a = 2 , .b = 7, .c = 5},
    {.a = 2 , .b = 5, .c = 3},
    //bottom
    {.a = 1 , .b = 4, .c = 6 },//146  //681
    {.a = 1 , .b = 6, .c = 8 },//168  //614
    

};