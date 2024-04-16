//#include<stdio.h> // includes info about standard library
//#include <stdlib.h> 

#pragma once
#ifndef VECTOR_H  //ifndef--> checks if it links to the file
#define VECTOR_H

// vec3_t vec3_rotate_z(vec3_t v, float angle);
typedef struct {
	float x;
	float y;
} vec2_t;



typedef struct {
	float x;
	float y;
	float z;
} vec3_t;

typedef struct {
	float x;
	float y;
	float z;
	float w;
}vec4_t;

//convert 
vec4_t vec3_convertVec4(vec3_t v);
vec3_t vec4_convertVec3(vec4_t v);



//function declaration
vec3_t vec3_rotate_z(vec3_t v, float angle);
vec3_t vec3_rotate_x(vec3_t v, float angle);
vec3_t vec3_rotate_y(vec3_t v, float angle);

float vec3_length(vec3_t v);
float vec2_length(vec2_t v);

vec2_t vec2_add(vec2_t v, vec2_t v2);
vec3_t vec3_add(vec3_t v, vec3_t v2);

vec2_t vec2_sub(vec2_t v, vec2_t v2);
vec3_t vec3_sub(vec3_t v, vec3_t v2);


vec2_t vec2_mul(vec2_t v, float scalar); //takes in a vector and a scale
vec3_t vec3_mul(vec3_t v, float scalar);


vec2_t vec2_div(vec2_t v, float scalar);
vec3_t vec3_div(vec3_t v, float scalar);

vec3_t vec3_cross(vec3_t a, vec3_t b);
float vec3_dot(vec3_t a, vec3_t b);
float vec2_dot(vec2_t a, vec2_t b);



void normalize(vec2_t* v);//its a pointer to vec2_t
#endif