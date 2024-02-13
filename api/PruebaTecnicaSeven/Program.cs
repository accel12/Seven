using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using PruebaTecnicaSeven.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<ComentarioSettings>(builder.Configuration.GetSection(nameof(ComentarioSettings)));
builder.Services.AddSingleton<IComentarioSettings>(d=>d.GetRequiredService<IOptions<ComentarioSettings>>().Value);

// Add services to the container.
builder.Services.AddDbContext<SevenContext>(options =>
{
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
	options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
	{
		ValidateIssuer = true,
		ValidateAudience = true,
		ValidateLifetime = false,
		ValidateIssuerSigningKey = true,
		ValidIssuer = builder.Configuration["Jwt:Issuer"],
		ValidAudience = builder.Configuration["Jwt:Audience"],
		IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:key"]))
	};
});
builder.Services.AddCors(options =>
{
	options.AddDefaultPolicy(builder =>
	{
		builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
	});
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
