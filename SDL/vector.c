#include "vector.h"
#include <math.h>
#include "matrix.h"



//rotate z
vec3_t vec3_rotate_z(vec3_t v, float angle)   
{
	vec3_t rotate_vector = {
		.x = v.x * cos(angle) - v.y * sin(angle),
		.y = v.x * sin(angle) + v.y * cos(angle),
		.z = v.z,
	};
	return rotate_vector;
}

//rotate x
vec3_t vec3_rotate_x(vec3_t v, float angle)
{
	vec3_t rotate_vector = {
		.x = v.x,
		.y= v.y * cos(angle) - v.z* sin(angle),
		.z = v.y * sin(angle) + v.z * cos(angle),
	};
	return rotate_vector;//.z=v.z
}

//rotate y
vec3_t vec3_rotate_y(vec3_t v, float angle)
{
	vec3_t rotate_vector = {
		.x = v.x * cos(angle) - v.z * sin(angle),
		.y=v.y,
		.z = v.x * sin(angle) + v.z * cos(angle),
	};
	return rotate_vector;
}

float vec2_length(vec2_t v)
{
	float length = sqrt(v.x * v.x + v.y * v.y);
	return length;
}

 float  vec3_length(vec3_t v)
{
	return sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

vec2_t vec2_add(vec2_t v, vec2_t v2)
{
	vec2_t result;
	result.x = v.x+ v2.x;
	result.y = v.y + v2.y;
	return result;
}

vec3_t vec3_add(vec3_t v, vec3_t v2)
{
	vec3_t result;
	result.x = v.x + v2.x +v.z;
	result.y = v.y + v2.y ;
	result.z = v.z + v2.z;
	return result;
}


vec2_t vec2_sub(vec2_t v, vec2_t v2)
{
	vec2_t result = {
		.x = v.x - v2.x,
		.y = v.y - v2.y
	};
	return result;
}

vec3_t vec3_sub(vec3_t v, vec3_t v2)
{
	vec3_t result = {
		.x = v.x - v2.x,
		.y = v.y - v2.y,
		.z= v.z- v2.z
	};
	return result;
}

vec2_t vec2_mul(vec2_t v, float scalar)
{
	vec2_t result = {
	.x = v.x * scalar,
	.y = v.y * scalar
	};
}

vec3_t vec3_mul(vec3_t v, float scalar)
{
	vec3_t result = {
	.x = v.x * scalar,
	.y = v.y * scalar,
	.z = v.z * scalar
	};
}

vec2_t vec2_div(vec2_t v, float scalar) 
{
	vec2_t result = {
		.x = v.x / scalar,
		.y = v.y / scalar
	};
}

vec3_t vec3_div(vec3_t v, float scalar)
{
	vec3_t result = {
	.x = v.x / scalar,
	.y = v.y / scalar,
	.z = v.z / scalar
	};
}

vec3_t vec3_cross(vec3_t a, vec3_t b)
{
	vec3_t result = {
		.x = a.y * b.z - a.z * b.y,
		.y = a.z * b.x - a.x * b.z,
		.z = a.x * b.y - a.y * b.x
	};
	return result;
}

float vec2_dot(vec2_t a, vec2_t b)
{
	return (a.x * b.x) + (a.y * b.y);
}

float vec3_dot(vec3_t a, vec3_t b)
{
	return (a.x * b.x) + (a.y * b.y) + (a.z * b.z);
}

//vec4_t mul_mat_vec(mat4_t m, vec4_t v)
//{
//	return vec4_t v,// you return vec4_t
//}

void normalize(vec2_t* v)
{
	float length = sqrt(v->x * v->x + v->y * v->y);
	v->x /= length;
	v->y /= length;
}
