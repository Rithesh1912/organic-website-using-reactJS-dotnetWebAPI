using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrganicShopBackend.Migrations
{
    /// <inheritdoc />
    public partial class updateimages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$XjfGUaeIu.udshg8gpc/teGGci1JP9cuYTkqKQF48NZfvGbYs8wpm");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$DwwJYywXEdN8.QT2WBrv8OH4clJLlZXPEYUlTwUan3YutA6ocfE6y");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$9GB34v7yC1Dw1Cl9kHS4a.nLykTHbt.VAuMtfgFVObVznzgGzgHKG");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$Dit4Ux05APr1uXY0ZuyXXu2yZcqb5iwDO9jF.FNhLCaSJQv2s8X2.");
        }
    }
}
