using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Interfaces;
using WebAPI.Services;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebAPI.Extensions;


var builder = WebApplication.CreateBuilder(args);
var config=builder.Configuration;

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddApplicationServices(config);
builder.Services.AddIdentityServices(config);
builder.Services.AddCors();
var app = builder.Build();



app.UseHttpsRedirection();
app.MapControllers();
app.UseRouting();
app.UseCors(policy=>policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));
app.UseAuthentication();
app.UseAuthorization();

app.Run();
